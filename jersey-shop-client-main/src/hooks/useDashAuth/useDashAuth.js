import { useEffect, useState } from "react"

const useDashAuth = (email, role) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/role/authorization/${role}/${email}`,
                {
                    headers: {
                        authorization: `bearrer ${localStorage.getItem('accessToken')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setIsAuthorized(data.acknowledge);
                    setIsUserLoading(false);
                })
        }
    }, [email, role])
    return [isAuthorized, isUserLoading]
}

export default useDashAuth;