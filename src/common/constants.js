export const taxRateSelect = {
  items: [
    {
      title: '1%',
      value: 1
    },
    {
      title: '2%',
      value: 2
    },
    {
      title: '3%',
      value: 3
    }
  ]
}

export const richListTable = {
  headers: [
    {
      align: 'start',
      key: 'rank',
      title: 'Rank',
      sortable: false,
      width: 120
    },
    {
      align: 'start',
      key: 'name',
      title: 'Name',
      sortable: false,
      width: 380
    },
    {
      align: 'end',
      key: 'worthGross',
      title: 'Worth',
      sortable: false,
      width: 200
    },
    {
      align: 'end',
      key: 'actions',
      title: '',
      sortable: false,
      width: 180
    }
  ],
  filterKeys: ['name']
}

export const summaryTable = {
  headers: [
    {
      align: 'start',
      key: 'name',
      title: 'Name',
      sortable: false,
      width: 380
    },
    {
      align: 'end',
      key: 'worthGross',
      title: 'Worth now',
      sortable: false,
      width: 200
    },
    {
      align: 'end',
      key: 'worthNet',
      title: 'Worth after',
      sortable: false,
      width: 200
    },
    {
      align: 'end',
      key: 'tax',
      title: 'UK Treasury',
      sortable: false,
      width: 200
    }
  ]
}
