import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
  Redirect
} from 'react-router-dom';
import './UserIcon.css';

class UserIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
    this.userClick = this.userClick.bind(this);

  }

  userClick() {
    this.setState({
      redirect: !this.state.redirect
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/account" />
      );
    }
    return (
      <img className="users-userIcon" onClick={this.userClick} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABmJLR0QA/wD/AP+gvaeTAAADtUlEQVRoge2aTWhcVRiGn+/eyRSKwVKhqA21MTMaGxF0EourbqSoBVPB1oUB8adNp/GnuHBVqnblVi0mYxCFuIoM0tgiKEq7qFWSJquh2MmEQGNdiDUmgjaTez43Y6mNeu/MfDeNcJ/1Oc+8b86dM+ceAgkJCQkJaxdZjQ/JFSpbUO310F2KbAVtq338nKCzqnJCHMfHBzIX484Sa+GHBr/fXBU5AvI84IcMdwJFX5df+zZ/z2xcmWIrnCtM7xbVEeCmOqcu4uibOJgdiyOXF4e0Z+jCK6JapP6yAK14fJorXHjZOhfEsMK1lS3S/B/T4XjCeqVNC28fLrcFAedpbGX/icWgGnROvdR5ychn+0gHAUexKwvQmkr5bxr67FY4V6hsEXUzhO/G9RL4Plu/25eds5AZrnCwG/uyAH7g6LWSmRUWlUetXCtQfcxKZbfCQsbMtQKvw8xkJUK51cy1Ur7ZymS5S1vuzrG5YzlprWUsC/9m6LqeBSuRZWGz01CcbsvCM4au61Azt+EuLSfNXCvUcsLKZXfwcBwHAivfNSynPD6zkpkVrl3PfGTlu4rIB1bnaDD+WWpR9zqwaKhcUJZM35ZMC5/N3/0DnjyFzaPtBPrO9W/70cB1FfODx8T+zOcq+irgmtA4RQ6NH8iafXf/IrZLvO73yo/j8THQWufUBaf69GT+LrOd+VpiO1pOHMyOBWk6ROUdYDnCFIcwolLtjKssrNJF/Pbhclvg6MWxC6EdqF3EMwc6I8hJz2fMcjdOSEhISPg/EtvP0p5R9WfnZx5A9X5Vdy+wDbw20A3AzbVh8yC/gpsT9Up4lERl8o6Nd059slfiePOyLXzf4PSmdaJPKuwEdgAbGgz1i0NPAV+4tBSnnsv+ZJWx6cJdo6X0+p/Te1ToAx4GUs3H+hvLKF8iOvL7xmqxtLdrqRlZw4UfPHb+Fue3HEAYAL2tmRCRUS6JcCyVWiqcfaHrciOKugt3jZbS6y+35BV5gwYfWQPmFd5qXZd6+9Sz7X/UM7Guwj3vl3eo40Ogva548VFB5ZmJfOZM1AnR3pZUpWdw+qg6vmLtlAXoQPR0z1D5CKqRFi98kKp0F6bfBQaaTRcnCsPn+jP9iOh/jQtd4Vyh8iJrvCyAwL7uoUpoztDCgh6yiRQ/Khr6nz9RvsO3G2RZFSRC1iiFpwyyrBIamjW0sFM5TLQ7qRtNVTw5HDYotPBkPvO14D2C8g1wxSSaLVeAMyg7x/dnT9/oMAkJCQkJCQn/zp+glSJD4Y7XBwAAAABJRU5ErkJggg=="></img>
    );
  }
}

export default UserIcon;