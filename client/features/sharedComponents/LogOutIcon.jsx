import React from 'react';
import './LogOutIcon.css';

const LogOut = props => {

  const removeSession = () => {
    props.updateSession();
  };

  return (
    <img
      alt="log out user"
      className="nav-icon nav-icon-logout"
      onClick={ removeSession }
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAD2ElEQVRoge2ZT2gcVRjAf9/LJtKaUqyKtmkPtrsm0JPsJsVjixd70kOoGAUPld0lKfQoiLiCiD2K2SRLIacU2tSDgnrMtdjs9CaabERs41qqCUVjStbsfB6yBZ0/OzO7M1Fofre873s7vy/vzbx5b2CPPR5tJI4fGZ3Xnp/WV0Zs4TQqWUWHDBxW6G9dZEOhDrKEqGU3Wbh1L32TktjdXrurAobLK8fo0XEb3hAYiNh9VZQ5k6L8zduZ1U4dOirghdna0z0N/RDkLaCv04u3aIDMqjTfs/KDv0XtHLmAbGX5dVH5FDgUtW8Aa6hMVIvpq1E6hS4gW6n2GvvglArno7tFQKSi3L9g5XN/hUoPk5St1PeL/ednCC93ZxcW/Vqlf9TKH9kMyjRBCdlKtXd35QHkrNibX5yc/zbw/goswNgHp3ZXvoXoS/vWH/skMK1dcHi6NqbCXHxW0RHktcVC+pp/3IeRye+etFOp74GnEjELz7qKPej3iPWdQnaq5yP+e3mAQ6j5wC/oOQKnLteONpv8QPeLVFw0VEzGyp+47Qx4joDdZILdlld8/8tAn7HtolfAXUBJjcJYXF5hqRYzJYV3/OK28ObovPY4210FjDy7cgo4GrNfKKxC5pLfSAgM/Li2nHW2uwqwhdNJyIWlWsyU/IpQY84421wFqGouCbEo+E0nUYJHQJDnkxKLgs90GnTmpTz6Hu7mwtVCJpZdHuyMRHam9kDg41aTy83rMdofl0AcWIXMpX9MpwPOeODL3P8BUfb5xbwK2EjQJTK56VoJ4f3Wn3844173wC90sV3MzdS0k35e945D/qHbv3A/RtHlTgTixkMeYMmZ536MilQTswqJjzwKLjf3StxkISmxMPjJAxhjXG6uAm7dS98E7iTgFkg7eeD2Yv245Wz0eBsVW5QrccsFESCPwhWvo0jPdcCkKAONGP2CaSMPbPWpXfYKeBawc1Yps7GIxYFw+UZx8GevkO9K3JvaeheIfFaZAGuK7btb8y3gxvmT66hcSMYpPCoU2x36tn0XqhbTVxGpxK8VmrKVz1xvlxD4MvfcEyfGgc9jUwqNfNV/d/ViYFaYn8pW6vtFN66DnO1eLBiFL5HHz8VyuAtg5Y9sqvz+CshM93qBlA/cXX01jDx08IFjeGblnKKTxH1qp/yqhvGgOe8k8oZmsZC+Zra3hxSmgK2o/T3YQpjs7W0MRZWHLj/yvTi9NLCNmVBhDDgWsfsdhbk+tct+i1QY4tmAl9TknlnOqTFnWkcfg+x8tXy4v95AdBWVZYWqMWZhsX7ciuMz6x57POr8DcXOPqGx7t59AAAAAElFTkSuQmCC">
    </img>
  );
};

export default LogOut;