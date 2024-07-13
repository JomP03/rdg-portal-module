import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

interface NavigateToHomeProps {
  homePath: string;
}

const NavigateToHome: React.FC<NavigateToHomeProps> = ({homePath}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(homePath);
    }, [])

    return (
        <></>
    )
}

export default NavigateToHome