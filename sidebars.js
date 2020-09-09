module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'getting-started',
    },
    {
      type: 'doc',
      id: 'payid-cli',
    },
    {
      type: 'category',
      label: 'PayID Protocol',
      items: [
        'payid-overview',
        'payid-headers',
        'payid-interfaces',
        'payid-schemas',
      ],
    },
    {
      type: 'doc',
      id: 'verifiable-payid',
      id: 'payid-discovery',      
    },
    {
      type: 'category',
      label: 'Reference Implementation',
      items: [
        'payid-reference-overview',
        'api-reference',
        'payid-best-practices',
        'integrate-payid-users',
        'metrics',
      ],
    },
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'payid-server-requirements',
        'remote-deployment',
        'local-deployment',
      ],
    },
    {
      type: 'category',
      label: 'PayID Tooling',
      items: ['xpring-sdk-payid', 'community-resources'],
    },
    {
      type: 'category',
      label: 'Release Notes',
      items: ['release-notes'],
    },
  ],
}
