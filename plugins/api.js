let basePath = '/api/v1'

let headerJson = {
  'Content-Type': 'application/json',
}
let headerAuth = {
  Authorization: true,
}
let headerAuthJson = {
  Authorization: true,
  'Content-Type': 'application/json',
}
let headerAuthForm = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: true,
}

export default ({ app }, inject) => {
  inject('api', {
    // auth
    login: (form) => {
      return app.$axios.post(`${basePath}/login`, form, {
        headers: headerJson
      })
    },
    newUser: (form) => {
      return app.$axios.post(`${basePath}/newUser`, form, {
        headers: headerAuthJson
      })
    },
    resetPassword: (id, form) => {
      return app.$axios.put(`${basePath}/password/reset/${id}`, form, {
        headers: headerAuthJson
      })
    },
    logout: () => {
      return app.$axios.get(`${basePath}/logout`, {
        headers: headerAuthJson
      })
    },

    // users
    me: () => {
      return app.$axios.get(`${basePath}/me`, {
        headers: headerAuthJson
      })
    },
    getUsers: () => {
      return app.$axios.get(`${basePath}/users`, {
        headers: headerAuthJson
      })
    },
    updateMe: (form) => {
      return app.$axios.put(`${basePath}/me/update`, form, {
        headers: headerAuthJson
      })
    },
    changePassword: (form) => {
      return app.$axios.put(`${basePath}/password/change`, form, {
        headers: headerAuthJson
      })
    },
    deleteUser: (id) => {
      return app.$axios.delete(`${basePath}/users/${id}`, {
        headers: headerAuthJson
      })
    },

    // medical record
    getMedicalRecords: () => {
      return app.$axios.get(`${basePath}/medicalRecord`, {
        headers: headerAuthJson
      })
    },
    getMedicalRecord: (id) => {
      return app.$axios.get(`${basePath}/medicalRecord/${id}`, {
        headers: headerAuthJson
      })
    },
    createMedicalRecords: (form) => {
      return app.$axios.post(`${basePath}/medicalRecord/new`, form, {
        headers: headerAuthJson
      })
    },
    updateMedicalRecords: (id, form) => {
      return app.$axios.put(`${basePath}/medicalRecord/${id}`, form, {
        headers: headerAuthJson
      })
    },
    deleteMedicalRecords: (id) => {
      return app.$axios.delete(`${basePath}/medicalRecord/${id}`, {
        headers: headerAuthJson
      })
    },

    // medical supplies
    getMedicalSupplies: () => {
      return app.$axios.get(`${basePath}/medicalSupplies`, {
        headers: headerAuthJson
      })
    },
    getMedicalSupply: (id) => {
      return app.$axios.get(`${basePath}/medicalSupplies/${id}`, {
        headers: headerAuthJson
      })
    },
    createMedicalSupplies: (form) => {
      return app.$axios.post(`${basePath}/medicalSupplies/new`, form, {
        headers: headerAuthJson
      })
    },
    updateMedicalSupplies: (id, form) => {
      return app.$axios.put(`${basePath}/medicalSupplies/${id}`, form, {
        headers: headerAuthJson
      })
    },
    deleteMedicalSupplies: (id) => {
      return app.$axios.delete(`${basePath}/medicalSupplies/${id}`, {
        headers: headerAuthJson
      })
    },

    // supply activities
    getActivities: () => {
      return app.$axios.get(`${basePath}/activities`, {
        headers: headerAuthJson
      })
    },

    // Initial symptom
    addInitialSymptom: (form) => {
      return app.$axios.post(`${basePath}/symptom`, form, {
        headers: headerAuthJson
      })
    },
    getSymptom: (id) => {
      return app.$axios.get(`${basePath}/symptom/${id}`, {
        headers: headerAuthJson
      })
    },
    updateSymptom: (id ,form) => {
      return app.$axios.put(`${basePath}/symptom/${id}`, form, {
        headers: headerAuthJson
      })
    },

    // queue
    getQueues: () => {
      return app.$axios.get(`${basePath}/queue`, {
        headers: headerAuthJson
      })
    },
    getQueue: (id) => {
      return app.$axios.get(`${basePath}/queue/${id}`, {
        headers: headerAuthJson
      })
    },
    updateQueue: (id, form) => {
      return app.$axios.put(`${basePath}/queue/${id}`, form, {
        headers: headerAuthJson
      })
    },

    // drug
    createDrugList: (form) => {
      return app.$axios.post(`${basePath}/druglist`, form, {
        headers: headerAuthJson
      })
    },
    paidDrug: (id) => {
      return app.$axios.put(`${basePath}/druglist/${id}`, {}, {
        headers: headerAuthJson
      })
    },
    deleteDrugList: (id) => {
      return app.$axios.delete(`${basePath}/druglist/${id}`, {
        headers: headerAuthJson
      })
    },

    // appointment
    getAppointments: () => {
      return app.$axios.get(`${basePath}/appointment`, {
        headers: headerAuthJson
      })
    },
    createAppointments: (form) => {
      return app.$axios.post(`${basePath}/appointment`, form, {
        headers: headerAuthJson
      })
    },
    updateAppointments: (id, form) => {
      return app.$axios.put(`${basePath}/appointment/${id}`, form, {
        headers: headerAuthJson
      })
    },
    deleteAppointments: (id) => {
      return app.$axios.delete(`${basePath}/appointment/${id}`, {
        headers: headerAuthJson
      })
    },

    // payment
    createPayment: (form) => {
      return app.$axios.post(`${basePath}/payment`, form, {
        headers:headerAuthJson
      })
    },
    getPayment: (id) => {
      return app.$axios.get(`${basePath}/payment/${id}`, {
        headers: headerAuthJson
      })
    },
    updatePayment: (id) => {
      return app.$axios.put(`${basePath}/payment/${id}`, {}, {
        headers: headerAuthJson
      })
    }

  })
}
