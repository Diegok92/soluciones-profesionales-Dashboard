import React from "react";
import LastUserDetail from "./LastUserDetail";
import Rubros from "./Rubros";

function ContentRowCenter() {
  return (
    <div className="row">
      {/*<!-- Last Movie in DB -->*/}
      <LastUserDetail />
      {/*<!-- End content row last movie in Data Base -->*/}

      <Rubros />
    </div>
  );
}

export default ContentRowCenter;
