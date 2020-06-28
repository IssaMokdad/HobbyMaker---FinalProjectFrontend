import React, { useEffect } from "react";

export default function TestChat(props) {
  useEffect(() => {
    (function(d, m) {
      var kommunicateSettings = {
        appId: "288cf8dd240e82dc8b076d1bb2691697f",
        onInit: function() {
          var chatContext = {
            user_id: props.userAuthenticatedId,
          };
          window.Kommunicate.updateChatContext(chatContext);
        },
        popupWidget: false,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
    // eslint-disable-next-line
  }, []);

  return <div></div>;
}
