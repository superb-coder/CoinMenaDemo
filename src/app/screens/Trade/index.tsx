import React from "react";
import { Asset } from "../../utils/types";
import * as Icon from "react-bootstrap-icons";
import { getAssets } from "../../services/http_services";
import AppAssetModal from "../../components/AppAssetModal";
import { connect } from "react-redux";
import { RootState } from "../../redux/store";
import validator from "validator";

interface TradeStateType {
  cryptoAmount: string;
  cryptoToken?: Asset;
  assets: Array<Asset>;
  page: number;
  isVisible: boolean;
}

interface TradePropsType {
  email?: string;
}

class Trade extends React.Component<TradePropsType, TradeStateType> {
  constructor(props: TradePropsType) {
    super(props);
    this.state = {
      cryptoAmount: "0",
      cryptoToken: undefined,
      assets: [],
      page: 1,
      isVisible: false,
    };
  }

  componentDidMount() {
    this.getAssets(1);
  }

  getAssets(page: number, sort?: string) {
    const { assets, cryptoToken } = this.state;
    if (page < 1 || (assets.length < 10 && page !== 1)) {
      return;
    }
    getAssets(page, sort).then((e) => {
      this.setState({ assets: [...assets, ...e.data.data], page });
      if (cryptoToken === undefined) {
        this.setState({ cryptoToken: e.data.data[0] });
      }
    });
  }

  onChangeAmount(value: string) {
    if (validator.isNumeric(value)) {
      this.setState({
        cryptoAmount: value,
      });
    } else if (value.at(-1) === "." && value.split(".").length < 3) {
      this.setState({
        cryptoAmount: value,
      });
    }
  }

  onSwap() {
    alert("Swap is coming soon!");
  }

  render() {
    const { cryptoAmount, cryptoToken, isVisible, assets, page } = this.state;
    const { email } = this.props;
    return (
      <div className="flex-fill bg-light d-flex align-items-center justify-content-center">
        {email && (
          <div className="card">
            <div className="card-header">Swap</div>
            <div className="card-body">
              <div className="d-flex flex-column  bg-light p-3 rounded-pill">
                <div className="d-flex flex-row">
                  <input
                    className="form-control ms-3"
                    inputMode="numeric"
                    value={cryptoAmount}
                    onChange={(value) =>
                      this.onChangeAmount(value.target.value)
                    }
                  />
                  <button
                    className="btn btn-secondary mx-3 text-nowrap"
                    onClick={() => this.setState({ isVisible: true })}
                  >
                    {cryptoToken?.symbol} <Icon.ChevronDown className="ms-2" />
                  </button>
                </div>
                <label className="ms-3 mt-1 text-secondary">
                  $
                  {cryptoToken?.metrics?.market_data?.price_usd?.toFixed(3) ??
                    0}
                </label>
              </div>
              <div className="d-flex flex-row mt-3 bg-light p-3 rounded-pill align-items-center justify-content-between">
                <label className="h4 mb-0 ms-3">
                  {(
                    parseFloat(cryptoAmount) *
                    (cryptoToken?.metrics?.market_data?.price_usd ?? 0)
                  ).toFixed(3)}
                </label>

                <button className="btn btn-danger mx-3 text-nowrap">USD</button>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={() => this.onSwap()}
              >
                Swap
              </button>
            </div>
          </div>
        )}
        {!email && (
          <h3 className="text-secondary">Please login to trade your tokens.</h3>
        )}
        <AppAssetModal
          isVisible={isVisible}
          onClose={() => this.setState({ isVisible: false })}
          onLoadMore={() => this.getAssets(page + 1)}
          onSelected={(value) =>
            this.setState({ cryptoToken: value, isVisible: false })
          }
          assets={assets}
        />
      </div>
    );
  }
}

const mapStateProps = (state: RootState) => ({
  email: state.auth.email,
});

export default connect(mapStateProps, null)(Trade);
