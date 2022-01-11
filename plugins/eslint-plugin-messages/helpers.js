const FS_LAYERS = [
    'app',
    'processes',
    'pages',
    'widgets',
    'features',
    'shared',
];

const FS_LAYERS_SLICES_PREFIX = 'Violated isolation between layers or slices:';
const FS_PUBLIC_API_PREFIX = 'Violated usage of modules Public API';
const FS_IMPORT_PREFIX = 'Broken order of imports';
const FS_LAYERS_URL = 'https://git.io/Jymh2';
const FS_PUBLIC_URL = 'https://git.io/Jymjf';
const FS_IMPORT_URL = 'https://git.io/JymjI';

const getUrlPostfix = (url) => `| ${url} `;

const getLayersSlicesMessage = (msg) =>
  `${FS_LAYERS_SLICES_PREFIX} ${msg.from} => ${msg.to} ${getUrlPostfix(
    FS_LAYERS_URL
  )}`;

const getPublicApiMessage = () =>
  `${FS_PUBLIC_API_PREFIX} ${getUrlPostfix(FS_PUBLIC_URL)}`;

const getImportOrderMessage = () =>
  `${FS_IMPORT_PREFIX} ${getUrlPostfix(FS_IMPORT_URL)}`;

// For split layers and slices
const isSliceMessage = (msg) =>
  FS_LAYERS.reduce((acc, cur) => {
      if (msg.message.split(cur) > 2) return true;
      return acc;
  }, false);

const getMessageLayerName = (msg) => {
    const { groups } = msg.match(/(?<from>"\S+").+(?<to>"\S+")/i);
    return { from: groups?.from || '', to: groups?.to || '' };
};

const replaceMessage = (msg) => {
    switch (msg.ruleId) {
        case 'import/order': {
            return {
                ...msg,
                message: getImportOrderMessage(),
                ruleId: 'feature-sliced/import-order',
            };
        }
        case 'boundaries/element-types': {
            return {
                ...msg,
                message: getLayersSlicesMessage(getMessageLayerName(msg.message)),
                ruleId: 'feature-sliced/layers-slices',
            };
        }
        case 'import/no-internal-modules': {
            return {
                ...msg,
                message: getPublicApiMessage(),
                ruleId: 'feature-sliced/public-api',
            };
        }
        default:
            return msg;
    }
};

module.exports = { replaceMessage };
