# ProChain interest survey

This folder contains a Google Apps Script that generates a Google Form
to gauge interest in ProChain and its services.

## Generate the form

1. Go to <https://script.google.com> and click **New project**.
2. Replace the default `Code.gs` content with the contents of
   [`createProChainForm.gs`](./createProChainForm.gs).
3. Press **Run** and choose the `createProChainForm` function.
4. Approve the requested permissions (the script needs access to Google
   Forms in your Drive).
5. Open **View -> Logs** (or **Executions**) to see the published URL,
   the short URL, and the edit URL of the new form.

The form is created in your Google Drive and can be edited, branded
with your colors and logo, and connected to a Google Sheet for
responses from the standard Google Forms interface.

## Questions included

- Full name
- Company or organization
- Country / city
- Buyer / supplier / both / exploring
- Industry (with "Other")
- Features of interest (multi-select with "Other")
- Likelihood of using ProChain in the next 3 months (1-10 scale)
- Interest in early-access contact
- Phone / WhatsApp (optional)
- Free-form comments

Feel free to edit the script before running it to tweak wording,
ordering, or required fields.
