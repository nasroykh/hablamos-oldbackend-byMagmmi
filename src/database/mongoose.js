const mongoose = require('mongoose')

// mongoose.connect('mongodb+srv://nasykh:IpfrOTHm9xcUie2S@cluster0-wqtyq.mongodb.net/Hablo?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });


// mongoose.connect('mongodb+srv://nasykh:IpfrOTHm9xcUie2S@cluster0-wqtyq.mongodb.net/Hablo?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });


mongoose.connect('mongodb://localhost:27017/Hablo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});



