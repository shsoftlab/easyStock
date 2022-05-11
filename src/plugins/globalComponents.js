import StockBadge from "../components/StockBadge";
import BaseAlert from "../components/BaseAlert";
import BaseButton from "../components/BaseButton";
import BaseCheckbox from "../components/BaseCheckbox";
import BaseDropdown from "../components/BaseDropdown";
import BaseHeader from "../components/BaseHeader";
import BaseInput from "../components/BaseInput";
import BaseNav from "../components/BaseNav";
import BasePagination from "../components/BasePagination";
import BaseProgress from "../components/BaseProgress";
import BaseSwitch from "../components/BaseSwitch";
import BaseRadio from "../components/BaseRadio";
import BaseTable from "../components/BaseTable";
import StockCard from "../components/StockCard";
import StockModal from "../components/StockModal";
import StatsCard from "../components/StatsCard";
import StockTabPane from "../components/Tabs/StockTabPane";
import StockTabs from "../components/Tabs/StockTabs";

import { ElTooltip, ElPopover } from "element-plus";

const GlobalComponents = {
  install(app) {
    app.component("badge", StockBadge);
    app.component("base-alert", BaseAlert);
    app.component("base-button", BaseButton);
    app.component("base-checkbox", BaseCheckbox);
    app.component("base-dropdown", BaseDropdown);
    app.component("base-header", BaseHeader);
    app.component("base-input", BaseInput);
    app.component("base-nav", BaseNav);
    app.component("base-pagination", BasePagination);
    app.component("base-progress", BaseProgress);
    app.component("base-switch", BaseSwitch);
    app.component("base-radio", BaseRadio);
    app.component("base-table", BaseTable);
    app.component("stock-card", StockCard);
    app.component("stock-modal", StockModal);
    app.component("stats-card", StatsCard);
    app.component("stock-tab-pane", StockTabPane);
    app.component("stock-tabs", StockTabs);
    app.use(ElTooltip);
    app.use(ElPopover);
  },
};

export default GlobalComponents;
