const INITIAL_STATE = {
    transaction: [], //? OK
    transactionAdminView: [], //? OK
    uservalidasiresep: [], //? OK
    usermenunggupembayaran: [], //? OK
    usermenunggukonfirmasi: [], //? OK
    userdiproses: [], //? OK
    userdikirim: [], //? OK
    userpesanandikonfirmasi: [], //? OK
    userdibatalkan: [], //? TINGGAL FILTER SORT
    adminvalidasiresep: [],
    adminmenunggupembayaran: [],
    adminmenunggukonfirmasi: [],
    admindiproses: [],
    admindikirim: [],
    adminpesanandikonfirmasi: [],
    admindibatalkan: []
}

export const transactionReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SAVED_TRANSACTION": //* SAVED SEMUA TRANSAKSI USER -- U0
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS", action.payload)
            return { ...state, transaction: action.payload };

        case "USER_VALIDASI_RESEP": //* SAVED USER VALIDASI RESEP UNTUK GET, FILTER, SORTIR -- U1
            console.log(`user validasi resep -- transactionReducers`)
            return { ...state, uservalidasiresep: action.payload };

        case "USER_MENUNGGU_PEMBAYARAN": //* SAVED USER MENUNGGU PEMBAYARAN UNTUK GET, FILTER, SORTIR -- U2
            console.log(`user menunggu pembayaran -- transactionReducers`)
            return { ...state, usermenunggupembayaran: action.payload };

        case "USER_MENUNGGU_KONFIRMASI": //* SAVED USER MENUNGGU KONFIRMASI UNTUK GET, FILTER, SORTIR -- U3
            console.log(`user menunggu konfirmasi -- transactionReducers`)
            return { ...state, usermenunggukonfirmasi: action.payload };

        case "USER_DIPROSES": //* SAVED USER DIPROSES UNTUK GET, FILTER, SORTIR -- U4
            console.log(`user diproses -- transactionReducers`)
            return { ...state, userdiproses: action.payload };

        case "USER_DIKIRIM": //* SAVED USER DIKIRIM UNTUK GET, FILTER, SORTIR -- U5
            console.log(`user dikirim -- transactionReducers`)
            return { ...state, userdikirim: action.payload };

        case "USER_PESANAN_DIKONFIRMASI": //* SAVED USER PESANAN DIKONFIRMASI UNTUK GET, FILTER, SORTIR -- U6
            console.log(`user pesanan dikonfirmasi -- transactionReducers`)
            return { ...state, userpesanandikonfirmasi: action.payload };

        case "USER_DIBATALKAN": //* SAVED USER PESANAN DIBATALKAN UNTUK GET, FILTER, SORTIR -- U7
            console.log(`user pesanan dibatalkan -- transactionReducers`)
            return { ...state, userdibatalkan: action.payload };

        case "SAVED_TRANSACTION_ADMIN": //* SAVED SEMUA TRANSAKSI ADMIN -- A0
            console.log("HOLA ~ INI ISI DATA TRANSACTION DR TRANSACTION REDUCERS KHUSUS ADMIN", action.payload)
            return { ...state, transactionAdminView: action.payload };

        default:
            return state
    }
}