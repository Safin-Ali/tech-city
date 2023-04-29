import { useState } from "react"

type ReturnType = () => void

const useComponentRemount = ():ReturnType => {
    const [mount,setMount] = useState<boolean>(false);
    const handleRemount = () => setMount(!mount);
    return handleRemount;
}

export default useComponentRemount;