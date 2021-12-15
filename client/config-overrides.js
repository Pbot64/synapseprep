/* Babel Overrides that Material IU recommends to make imports faster */
const { useBabelRc, override } = require('customize-cra');

module.exports = override(useBabelRc());
