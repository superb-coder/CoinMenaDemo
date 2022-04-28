import React from "react";
import { getAssets } from "../../services/http_services";
import { Asset } from "../../utils/types";
import "./styles.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as Icon from "react-bootstrap-icons";
import { Dropdown } from "react-bootstrap";

interface HomeStateType {
  assets: Array<Asset>;
  isLoading: boolean;
  page: number;
  sortField: string;
  sortDirection: boolean;
}

export default class Home extends React.Component<{}, HomeStateType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      assets: [],
      isLoading: true,
      page: 1,
      sortField: "",
      sortDirection: true,
    };
  }

  componentDidMount() {
    this.getAssets(1);
  }

  getAssets(page: number, sort?: string) {
    const { assets } = this.state;
    this.setState({ page: page });
    if (page < 1 || (assets.length < 10 && page !== 1)) {
      return;
    }
    getAssets(page, sort).then((e) =>
      this.setState({ assets: [...assets, ...e.data.data], isLoading: false })
    );
  }

  onSort(fieldName: string) {
    const { sortField, sortDirection, assets } = this.state;
    let direction = true;
    if (sortField === fieldName) {
      direction = !sortDirection;
    }
    switch (fieldName) {
      case "serial_id":
        this.setState({
          sortDirection: direction,
          sortField: "serial_id",
          assets: assets.sort(
            (a, b) => (direction ? 1 : -1) * (a.serial_id - b.serial_id)
          ),
        });
        break;
      case "symbol":
        this.setState({
          sortDirection: direction,
          sortField: "symbol",
          assets: assets.sort(
            (a, b) => (direction ? 1 : -1) * (a.symbol < b.symbol ? -1 : 1)
          ),
        });
        break;
      case "name":
        this.setState({
          sortDirection: direction,
          sortField: "name",
          assets: assets.sort(
            (a, b) => (direction ? 1 : -1) * (a.name < b.name ? -1 : 1)
          ),
        });
        break;
      case "price":
        this.setState({
          sortDirection: direction,
          sortField: "price",
          assets: assets.sort(
            (a, b) =>
              (direction ? 1 : -1) *
              (a.metrics.market_data.price_usd -
                b.metrics.market_data.price_usd)
          ),
        });
        break;
      default:
        return;
    }
  }

  renderDirection(fieldName: string) {
    const { sortField, sortDirection } = this.state;
    if (fieldName === sortField) {
      if (sortDirection) {
        return <Icon.ChevronDown className="ms-2" />;
      } else {
        return <Icon.ChevronUp className="ms-2" />;
      }
    }
  }

  render() {
    const { assets, isLoading, page } = this.state;
    return (
      <div className="flex-fill bg-light p-4">
        {isLoading ? (
          <div className="d-flex align-items-center justify-content-center flex-fill">
            <span className="spinner-border" />
          </div>
        ) : (
          <PerfectScrollbar
            options={{ suppressScrollX: false }}
            className="flex-fill p-3 bg-white d-flex flex-column align-items-center"
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" onClick={() => this.onSort("serial_id")}>
                    Serial ID
                    {this.renderDirection("serial_id")}
                  </th>
                  <th scope="col" onClick={() => this.onSort("symbol")}>
                    Symbol
                    {this.renderDirection("symbol")}
                  </th>
                  <th scope="col" onClick={() => this.onSort("name")}>
                    Name
                    {this.renderDirection("name")}
                  </th>
                  <th scope="col" onClick={() => this.onSort("price")}>
                    Price(USD)
                    {this.renderDirection("price")}
                  </th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {assets.map((e) => (
                  <tr key={e.id}>
                    <th scope="row">{e.serial_id}</th>
                    <td>{e.symbol}</td>
                    <td>{e.name}</td>
                    <td>{e.metrics.market_data.price_usd.toFixed(3)}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                          Action
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>Buy</Dropdown.Item>
                          <Dropdown.Item>Sell</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-primary btn-sm px-4"
              onClick={() => this.getAssets(page + 1)}
            >
              More
            </button>
          </PerfectScrollbar>
        )}
      </div>
    );
  }
}
