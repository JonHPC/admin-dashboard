import { jsx as _jsx } from "react/jsx-runtime";
import { DashboardOutlined, ProjectOutlined, ShopOutlined } from "@ant-design/icons";
export const resources = [
    {
        name: "dashboard",
        list: "/",
        meta: {
            label: "Dashboard",
            icon: _jsx(DashboardOutlined, {})
        }
    },
    {
        name: "companies",
        list: "/companies",
        show: "/companies/:id",
        create: "/companies/new",
        edit: "/companies/edit/:id",
        meta: {
            label: "Companies",
            icon: _jsx(ShopOutlined, {})
        }
    },
    {
        name: "tasks",
        list: "/tasks",
        create: "/tasks/new",
        edit: "/tasks/edit/:id",
        meta: {
            label: "Tasks",
            icon: _jsx(ProjectOutlined, {})
        }
    }
    /**
     * A resource in Refine performs these actions:
     * list -> get all records (Read)
     * show -> get a single record (Read)
     * create -> create a record (Create)
     * edit -> update a record (Update)
     * delete -> delete a record (Delete)
     * or clone
     */
];
