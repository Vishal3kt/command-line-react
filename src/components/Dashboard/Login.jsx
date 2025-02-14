import { useAnimationControls } from "framer-motion";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const encryptedData = 'YWRtaW4=';

const Login = ({ setIsAdmin }) => {
    const [invalidPassword, setInvalidPassword] = useState(false);
    const password = useRef();

    const animationControls = useAnimationControls();


    function checkPassword(e) {
        if (e.code === 'Enter') {
            if (btoa(password.current.value) === encryptedData) {
                setIsAdmin(true);
            } else {
                setInvalidPassword(true);
                animationControls.start('jiggle')
            }
        }
    }

    return (
        <div id="login-container">
            <label>Enter Password</label>
            <motion.input
                onKeyUp={checkPassword}
                ref={password}
                className={invalidPassword ? 'invalid' : ''}
                type="password"
                placeholder="Password"
                animate={animationControls}
                maxLength="30"
                transition={{
                    duration: 0.2,
                    type: 'spring',
                    stiffness: 2050
                }}
                variants={{
                    jiggle: {
                        x: [-15, 0, 15, 0],
                    }
                }}
            />
        </div>
    )
}

export default Login
