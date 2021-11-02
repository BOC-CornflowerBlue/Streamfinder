
import React from 'react';
const TempDisplay1 = (props) => {
  const firstFive = props.data.filter((v, i) => { if (i <= 4) { return v; } });
  return (
    <div className='temp-container'>
      {firstFive.map((values, i)=>
        <div key={i} className='temp-sl'>
          <h1>{values.title}</h1>
          <img className='temp' src={values.imgUrl} alt="" />
          <div className='provider'>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/dgPueyEdOwpQ10fjuhL2WYFQwQs.jpg'/>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/aS2zvJWn9mwiCOeaaCkIh4wleZS.jpg'/>
            <img className='provider-thumbnail' src='https://www.themoviedb.org/t/p/original/9A1JSVmSxsyaBK4SUFsYVqbAYfW.jpg'/>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempDisplay1;