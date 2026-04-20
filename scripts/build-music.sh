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

# Tense bass rumble: 55Hz + 82.5Hz with light tremolo, 0-10s (hook + pain)
ffmpeg -y -f lavfi -i "sine=frequency=55:duration=10" \
  -f lavfi -i "sine=frequency=82.5:duration=10" \
  -filter_complex "[0]volume=0.18[a];[1]volume=0.08[b];[a][b]amix=inputs=2:duration=longest:normalize=0,tremolo=f=0.8:d=0.35,afade=t=out:st=9:d=1" \
  -ar 44100 "$TMP/tense.wav" -loglevel error

# Uplifting pad: 220Hz + 330Hz (fifth) from reveal onward (10s-45s)
ffmpeg -y -f lavfi -i "sine=frequency=220:duration=35" \
  -f lavfi -i "sine=frequency=330:duration=35" \
  -filter_complex "[0]volume=0.07[a];[1]volume=0.05[b];[a][b]amix=inputs=2:duration=longest:normalize=0,afade=t=in:st=0:d=2,afade=t=out:st=33:d=2" \
  -ar 44100 "$TMP/pad.wav" -loglevel error

# Low background bed for demo+pills (15-37s)
ffmpeg -y -f lavfi -i "sine=frequency=110:duration=22" \
  -af "volume=0.06,afade=t=in:st=0:d=1,afade=t=out:st=20:d=2" \
  -ar 44100 "$TMP/bed.wav" -loglevel error

# ---------- final mix ----------
# Scene boundaries: s1=0-3, s2=3-10, s3=10-15, s4=15-27, s5=27-37, s6=37-45
# Timeline (ms):
#   0     s1 Hook starts (tense bass in)
#   200   "نواقصك" impact
#   700   "في مطعمك" impact
#   1400  "نار" big boom
#   3000  s2 Pain begins
#   3700  damage card 1 boom (الجمعة)
#   4700  damage card 2 boom (السبت)
#   5700  damage card 3 boom (الأحد)
#   7000  total SAR counter big hit
#   9500  whoosh transition
#  10000  s3 Reveal — big boom + ding (logo sweep)
#  11000  logo slam boom
#  13000  tagline ding
#  15000  s4 Demo start whoosh
#  15200  word 1 "ابحث" tap ding
#  17900  word 2 "اطلب" tap ding
#  20500  word 3 "تابع" tap ding
#  23200  word 4 "استلم" tap ding
#  26300  bottom callout ding
#  27000  s5 Pills start whoosh
#  29300,30000,30700,31400,32000  pill cascade dings
#  37000  s6 End frame — flash boom
#  37800  logo reveal boom
#  40000  scarcity pill impact
#  41500  CTA ching1
#  42100  CTA ching2
#  43500  final boom

ffmpeg -y \
  -i "$TMP/tense.wav" \
  -i "$TMP/pad.wav" \
  -i "$TMP/bed.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/whoosh.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/ding.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/boom.wav" \
  -i "$TMP/impact.wav" \
  -i "$TMP/ching1.wav" \
  -i "$TMP/ching2.wav" \
  -i "$TMP/boom.wav" \
  -filter_complex "\
    [1]adelay=10000|10000[pad]; \
    [2]adelay=15000|15000[bed]; \
    [3]adelay=200|200,volume=0.9[s3]; \
    [4]adelay=700|700,volume=1.0[s4]; \
    [5]adelay=1400|1400,volume=1.3[s5]; \
    [6]adelay=3700|3700[s6]; \
    [7]adelay=4700|4700[s7]; \
    [8]adelay=5700|5700[s8]; \
    [9]adelay=7000|7000,volume=1.4[s9]; \
    [10]adelay=9500|9500,volume=1.1[s10]; \
    [11]adelay=10000|10000,volume=1.3[s11]; \
    [12]adelay=10300|10300[s12]; \
    [13]adelay=11000|11000,volume=1.2[s13]; \
    [14]adelay=13000|13000[s14]; \
    [15]adelay=15000|15000,volume=1.1[s15]; \
    [16]adelay=15200|15200[s16]; \
    [17]adelay=17900|17900[s17]; \
    [18]adelay=20500|20500[s18]; \
    [19]adelay=23200|23200[s19]; \
    [20]adelay=26300|26300[s20]; \
    [21]adelay=27000|27000[s21]; \
    [22]adelay=29300|29300[s22]; \
    [23]adelay=30000|30000[s23]; \
    [24]adelay=30700|30700[s24]; \
    [25]adelay=31400|31400[s25]; \
    [26]adelay=32000|32000[s26]; \
    [27]adelay=37000|37000,volume=1.4[s27]; \
    [28]adelay=37800|37800,volume=1.2[s28]; \
    [29]adelay=40000|40000,volume=1.2[s29]; \
    [30]adelay=41500|41500[s30]; \
    [31]adelay=42100|42100[s31]; \
    [32]adelay=43500|43500,volume=1.5[s32]; \
    [0][pad][bed][s3][s4][s5][s6][s7][s8][s9][s10][s11][s12][s13][s14][s15][s16][s17][s18][s19][s20][s21][s22][s23][s24][s25][s26][s27][s28][s29][s30][s31][s32]amix=inputs=33:duration=longest:normalize=0,dynaudnorm=p=0.75:m=10,alimiter=limit=0.95" \
  -t 45 -ar 44100 -ac 2 -b:a 192k "$OUT" -loglevel error

rm -rf "$TMP"

echo "Wrote $OUT:"
ls -lh "$OUT"
file "$OUT"
