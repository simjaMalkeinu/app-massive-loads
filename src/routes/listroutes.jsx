import EditInfo from "../pages/EditInfo";
import Home from "../pages/Home";
import UploadFile from "../pages/UploadFile";

const routes = [
    {
        path: '/home',
        element: Home
    },
    {
        path: '/Upload-data',
        element: UploadFile
    },
    {
        path: '/edit/:id',
        element: EditInfo
    }
];

export default routes;
