import React from "react";
import LastClientDb from "./LastClientDb";
import Rubros from "./Rubros";

function ContentRowCenter() {
  return (
    <div className="row">
      {/*<!-- Last Movie in DB -->*/}
      <LastClientDb />
      {/*<!-- End content row last movie in Data Base -->*/}

      <Rubros />
    </div>
  );
}

export default ContentRowCenter;
