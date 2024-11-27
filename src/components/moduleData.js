import React from "react";
import _nav from "../_nav";
import { commonDispatch } from "../dispatch";
const ModuleData = () => {

    const { setPermissionData } = commonDispatch();

    const restrictUrl = async (modulesData) => {

        var moduleData;
        await modulesData?.forEach(async (module) => {

            if (!module?.to) {
                await restrictUrl(module?.items);
            }
            else {
             
                if (module?.to === window.location.href?.slice(23)) {
                    moduleData = module;
                }
            }
        });

        if (moduleData) {
            let getReadAccess = userModule?.moduleData.filter((item) => item?.name === moduleData?.name);
            setPermissionData(getReadAccess[0]?.permissions);
            if (!getReadAccess[0]?.permissions?.read_access) {
                dispatch({ type: MENU_OPEN, data: { id: "default", parentId: "" } });
                navigate("/dashboard");
            }
        }
    }

    useEffect(() => {
        restrictUrl(_nav);
    }, [window.location.href])
}
export default ModuleData