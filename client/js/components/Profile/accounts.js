const React = require("react");
const { Link } = require("react-router");
const { array, string, func, bool } = require("prop-types");
const { Button } = require("react-bootstrap");

const titleCase = (str) => str.charAt(0).toUpperCase() + str.substr(1);

const Accounts = function(props) {
  let {
    providers,
    login_method,
    connected_accounts,
    unlink,
    isClicked,
    isPending,
    ...rest
  } = props;

  let accounts = providers.map((prov) => {
    if(login_method === prov) {
      return null;
    }
    if(connected_accounts.indexOf(prov) !== -1) {
      return(
        <Button {...rest} key={"unlink_" + prov} onClick={unlink.bind(this, prov)} disabled={isClicked === prov && isPending}>
          {isClicked && isPending ? "Loading..." : "Unlink " + titleCase(prov) + " "}
          {prov !== "local" && <i className={"fa fa-" + prov}/>}
        </Button>
      );
    }
    else {
      if(prov === "local") {
        return(
          <Link to="/register?linkAccount=true" key={"link_" + prov}>
            <Button {...rest}>Link Local Account</Button>
          </Link>
        );
      }
      else {
        return(
          <a href={"/auth/" + prov} key={"link_" + prov}>
            <Button {...rest}>
              Link {titleCase(prov)} <i className={"fa fa-" + prov}/>
            </Button>
          </a>
        );
      }
    }
  });

  return(
    <div>
      {accounts}
    </div>
  );
};

Accounts.propTypes = {
  unlink: func.isRequired,
  providers: array.isRequired,
  login_method: string.isRequired,
  connected_accounts: array.isRequired,
  isClicked: string,
  isPending: bool
};

module.exports = Accounts;
