#!/usr/bin/env bash
# Sound-design track for the ProChain ad (45s).
# Layers:
#   - low sub-bass rumble throughout for cinematic atmosphere
#   - tense bass for pain acts (0–10s)
#   - impact "booms" on each damage card and total reveal
#   - ding on discovery flash and logo reveal
#   - whoosh on demo cuts
#   - cha-ching-style triple hit on final CTA
#
# All samples are synthesized with ffmpeg lavfi (no external files).
set -euo pipefail

OUT="public/music.mp3"
mkdir -p public
TMP=$(mktemp -d)

# ---------- one-shots ----------
# Boom: 70Hz sine with sharp attack + 0.7s decay
ffmpeg -y -f lavfi -i "sine=frequency=70:duration=0.8" \
  -af "volume=1.0,afade=t=out:st=0.05:d=0.7,aecho=0.6:0.8:40:0.3" \
  -ar 44100 "$TMP/boom.wav" -loglevel error

# Impact: lower 50Hz + noise hit
ffmpeg -y -f lavfi -i "sine=frequency=52:duration=0.6" \
  -f lavfi -i "anoisesrc=duration=0.15:color=pink:amplitude=0.5" \
  -filter_complex "[1]highpass=f=800,volume=0.4,afade=t=out:st=0:d=0.15[n];[0]volume=0.9,afade=t=out:st=0.1:d=0.5[b];[b][n]amix=inputs=2:duration=longest:normalize=0" \
  -ar 44100 "$TMP/impact.wav" -loglevel error

# Ding: bright 1760Hz bell with quick decay
ffmpeg -y -f lavfi -i "sine=frequency=1760:duration=0.6" \
  -af "volume=0.5,afade=t=out:st=0.02:d=0.55" \
  -ar 44100 "$TMP/ding.wav" -loglevel error

# Whoosh: filtered noise sweep
ffmpeg -y -f lavfi -i "anoisesrc=duration=0.5:color=white:amplitude=0.6" \
  -af "highpass=f=500,lowpass=f=6000,volume=0.35,afade=t=in:st=0:d=0.1,afade=t=out:st=0.2:d=0.3" \
  -ar 44100 "$TMP/whoosh.wav" -loglevel error

# Cha-ching: two rising dings
ffmpeg -y -f lavfi -i "sine=frequency=1320:duration=0.25" \
  -af "volume=0.45,afade=t=out:st=0.02:d=0.23" \
  -ar 44100 "$TMP/ching1.wav" -loglevel error
ffmpeg -y -f lavfi -i "sine=frequency=1980:duration=0.5" \
  -af "volume=0.55,afade=t=out:st=0.05:d=0.45" \
  -ar 44100 "$TMP/ching2.wav" -loglevel error

# Tense bass rumble: 55Hz + 82.5Hz with light tremolo, 0-12s only (pain)
ffmpeg -y -f lavfi -i "sine=frequency=55:duration=12" \
  -f lavfi -i "sine=frequency=82.5:duration=12" \
  -filter_complex "[0]volume=0.18[a];[1]volume=0.08[b];[a][b]amix=inputs=2:duration=longest:normalize=0,tremolo=f=0.8:d=0.35,afade=t=out:st=11:d=1" \
  -ar 44100 "$TMP/tense.wav" -loglevel error

# Uplifting pad: 220Hz + 330Hz (fifth) fading in from 10s
ffmpeg -y -f lavfi -i "sine=frequency=220:duration=35" \
  -f lavfi -i "sine=frequency=330:duration=35" \
  -filter_complex "[0]volume=0.07[a];[1]volume=0.05[b];[a][b]amix=inputs=2:duration=longest:normalize=0,afade=t=in:st=0:d=2,afade=t=out:st=33:d=2" \
  -ar 44100 "$TMP/pad.wav" -loglevel error

# Kick pulse (every 0.6s from 12s to 38s) — simple rhythm
# Build a single kick then loop via aevalsrc timing using concat
ffmpeg -y -f lavfi -i "sine=frequency=60:duration=0.12" \
  -af "volume=0.9,afade=t=out:st=0.02:d=0.1" \
  -ar 44100 "$TMP/kick.wav" -loglevel error

# Low background bed for demo (18-38s)
ffmpeg -y -f lavfi -i "sine=frequency=110:duration=20" \
  -af "volume=0.06,afade=t=in:st=0:d=1,afade=t=out:st=18:d=2" \
  -ar 44100 "$TMP/bed.wav" -loglevel error

# ---------- final mix ----------
# Timeline (ms):
#   0     hook starts (tense bass in)
#   1000  phone buzz impact
#   3000  scene 2 begins
#   3600  card 1 boom (الجمعة)
#   4600  card 2 boom (السبت)
#   5600  card 3 boom (الأحد)
#   6600  total counter hit (bigger)
#   9900  whoosh before transition
#   10000 discovery ding
#   12000 logo reveal — double boom + ding
#  18000 demo start whoosh
#  20000, 22000, 24000, 26000 tap dings
#  28000 climax whoosh
#  30000 "الحين أنام مرتاح" impact
#  38000 CTA whoosh
#  40000 "شهر مجاني" big boom
#  42000 ching1
#  42600 ching2
#  44500 final boom

ffmpeg -y \
  -i "$TMP/tense.wav" \
  -i "$TMP/pad.wav" \
  -i "$TMP/bed.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/ching1.wav" \
  -i "$TMP/ching2.wav" \
  -i "$TMP/boom.wav" \
  -filter_complex "\
    [1]adelay=10000|10000[pad]; \
    [2]adelay=18000|18000[bed]; \
    [3]adelay=1000|1000[s3]; \
    [4]adelay=3600|3600[s4]; \
    [5]adelay=4600|4600[s5]; \
    [6]adelay=5600|5600[s6]; \
    [7]adelay=6600|6600,volume=1.3[s7]; \
    [8]adelay=9900|9900[s8]; \
    [9]adelay=10000|10000[s9]; \
    [10]adelay=12000|12000,volume=1.2[s10]; \
    [11]adelay=12300|12300,volume=1.1[s11]; \
    [12]adelay=12200|12200[s12]; \
    [13]adelay=18000|18000[s13]; \
    [14]adelay=20000|20000[s14]; \
    [15]adelay=22000|22000[s15]; \
    [16]adelay=24000|24000[s16]; \
    [17]adelay=26000|26000[s17]; \
    [18]adelay=28000|28000[s18]; \
    [19]adelay=30000|30000,volume=1.3[s19]; \
    [20]adelay=38000|38000[s20]; \
    [21]adelay=40000|40000,volume=1.4[s21]; \
    [22]adelay=42000|42000[s22]; \
    [23]adelay=42600|42600[s23]; \
    [24]adelay=44500|44500,volume=1.5[s24]; \
    [0][pad][bed][s3][s4][s5][s6][s7][s8][s9][s10][s11][s12][s13][s14][s15][s16][s17][s18][s19][s20][s21][s22][s23][s24]amix=inputs=25:duration=longest:normalize=0,dynaudnorm=p=0.75:m=10,alimiter=limit=0.95" \
  -t 45 -ar 44100 -ac 2 -b:a 192k "$OUT" -loglevel error

rm -rf "$TMP"

echo "Wrote $OUT:"
ls -lh "$OUT"
file "$OUT"
