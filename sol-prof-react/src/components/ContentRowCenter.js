import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import Rubros from './Rubros';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />
            {/*<!-- End content row last movie in Data Base -->*/}

           
            <Rubros />

        </div>
    )
}

export default ContentRowCenter;