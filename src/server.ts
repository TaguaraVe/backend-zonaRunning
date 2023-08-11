import app from './app';
import {connectDB} from './utils/connection'

const PORT = process.env.PORT || 3000;

const main = () => {
    connectDB()
    app.listen(PORT)
    console.log(`Server running on port ${PORT}`);

}

main()