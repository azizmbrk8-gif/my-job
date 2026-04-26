/**
 * Generates the ProChain interest survey as a Google Form.
 *
 * How to run:
 *   1. Open https://script.google.com and create a new project.
 *   2. Paste the contents of this file into the editor.
 *   3. Click Run -> createProChainForm and authorize the script.
 *   4. The execution log will print the live form URL and the edit URL.
 */
function createProChainForm() {
  const form = FormApp.create('ProChain - Interest Survey')
    .setDescription(
      'ProChain connects buyers and suppliers on a single platform. ' +
        'This short survey helps us understand who is interested in ' +
        'using ProChain and which features matter most to you. ' +
        'It takes about 2 minutes to complete - thank you!',
    )
    .setCollectEmail(true)
    .setAllowResponseEdits(false)
    .setShowLinkToRespondAgain(false)
    .setProgressBar(true);

  form.addTextItem().setTitle('Full name').setRequired(true);

  form
    .addTextItem()
    .setTitle('Company or organization')
    .setHelpText('Leave blank if you are an individual.');

  form
    .addTextItem()
    .setTitle('Country / city')
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Which best describes you?')
    .setChoiceValues([
      'Buyer - I source products or services',
      'Supplier - I sell products or services',
      'Both buyer and supplier',
      'Just exploring',
    ])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('What industry are you in?')
    .setChoiceValues([
      'Agriculture / Food',
      'Retail / Wholesale',
      'Manufacturing',
      'Technology',
      'Logistics / Transport',
      'Construction',
      'Health / Pharma',
      'Other',
    ])
    .showOtherOption(true)
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle('Which ProChain features interest you the most?')
    .setChoiceValues([
      'Browse and order products from verified suppliers',
      'List and sell my products to new buyers',
      'Manage orders and notifications in one place',
      'Secure payments and transaction history',
      'Account and supplier verification',
      'Mobile-first experience',
    ])
    .showOtherOption(true)
    .setRequired(true);

  form
    .addScaleItem()
    .setTitle('How likely are you to use ProChain in the next 3 months?')
    .setBounds(1, 10)
    .setLabels('Not at all likely', 'Very likely')
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Would you like to be contacted for early access?')
    .setChoiceValues(['Yes, contact me', 'No, just keeping an eye on it'])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('Phone or WhatsApp number (optional)')
    .setHelpText('Only used if you asked to be contacted for early access.');

  form
    .addParagraphTextItem()
    .setTitle('Anything else you want us to know?')
    .setHelpText(
      'Pain points you want ProChain to solve, features you would love to see, etc.',
    );

  Logger.log('Live form URL: %s', form.getPublishedUrl());
  Logger.log('Shareable URL: %s', form.shortenFormUrl(form.getPublishedUrl()));
  Logger.log('Edit URL: %s', form.getEditUrl());
}
