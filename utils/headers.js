// import _ from 'lodash'

export const AdminHeaders = [{
  text: 'ID',
  align: 'center',
  filterable: false,
  value: 'uuid'
}, {
  text: 'E-mail',
  align: 'center',
  value: 'email'
}, {
  text: 'Nama',
  align: 'center',
  value: 'name'
}, {
  text: 'Action',
  align: 'center',
  sortable: false,
  filterable: false,
  value: 'actions'
}]

export const OperatorHeaders = [{
  text: 'Operator',
  align: 'center',
  value: 'name'
}, {
  text: 'Jabatan',
  align: 'center',
  value: 'position'
}, {
  text: 'E-mail Sekolah',
  align: 'center',
  value: 'email'
}, {
  text: 'Telepon',
  align: 'center',
  value: 'phone_number'
}, {
  text: 'Action',
  align: 'center',
  sortable: false,
  filterable: false,
  value: 'actions'
}]

export const RequestOperatorHeaders = [{
  text: 'Sekolah',
  align: 'center',
  value: '-'
}, {
  text: 'NPSN',
  align: 'center',
  value: '-'
}, {
  text: 'Nama Operator',
  align: 'center',
  value: 'name'
}, {
  text: 'Jabatan',
  align: 'center',
  value: 'position'
}, {
  text: 'Email Sekolah',
  align: 'center',
  value: 'email'
}, {
  text: 'Telepon',
  align: 'center',
  value: 'phone_number'
}, {
  text: 'Actions',
  align: 'center',
  sortable: false,
  filterable: false,
  value: 'actions'
}]

export const RequestSekolahHeaders = [{
  text: 'Sekolah',
  align: 'center',
  value: 'name'
}, {
  text: 'NPSN',
  align: 'center',
  value: 'npsn'
}, {
  text: 'Operator',
  align: 'center',
  value: 'operator_name'
}, {
  text: 'Email Sekolah',
  align: 'center',
  value: 'email'
}, {
  text: 'Telepon',
  align: 'center',
  value: 'phone_number'
}, {
  text: 'Actions',
  sortable: false,
  filterable: false,
  value: 'actions'
}]

export const RequestDetailSekolahDefault = {
  name: '',
  address: '',
  province_id: null,
  regency_id: null,
  district_id: null,
  village_id: null,
  educational_stage: '',
  status: 0,
  accreditation: '',
  npsn: null,
  operator_name: '',
  email: '',
  phone_number: '',
  // extra
  province: {
    id: null,
    name: '',
    image: ''
  },
  regency: {
    id: 0,
    province_id: 0,
    name: '',
    image: ''
  },
  district: {
    id: 0,
    regency_id: 0,
    name: '',
    image: ''
  },
  village: {
    id: 0,
    district_id: 0,
    name: '',
    image: ''
  }
}

export const DaftarSekolahHeaders = [{
  text: 'Nama Sekolah',
  value: 'name'
}, {
  text: 'NPSN',
  align: 'center',
  value: 'npsn'
}, {
  text: 'Operator',
  align: 'center',
  // attr nya apa ?
  value: 'operator',
  sortable: false,
  filterable: false
}, {
  text: 'Email',
  align: 'center',
  value: 'email'
}, {
  text: 'Telepon',
  align: 'center',
  value: 'phone_number'
}, {
  text: 'Action',
  align: 'center',
  value: 'actions',
  sortable: false,
  filterable: false
}]

export const InboxHeaders = [{
  text: 'Nama',
  align: 'center',
  value: 'name'
}, {
  text: 'Email Sekolah',
  value: 'email'
}, {
  text: 'Pesan',
  value: 'message'
}, {
  text: 'Actions',
  value: 'actions'
}]
