const adminSalesHelpers = require("../../helpers/adminHelpers/adminSaleshelpers");

module.exports = {
  getSalesReport: async (req, res) => {
    getDate = (date) => {
      let orderDate = new Date(date);
      let day = orderDate.getDate();
      let month = orderDate.getMonth() + 1;
      let year = orderDate.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      return `${isNaN(day) ? "00" : day}-${isNaN(month) ? "00" : month}-${
        isNaN(year) ? "0000" : year
      } ${date.getHours(hours)}:${date.getMinutes(minutes)}:${date.getSeconds(
        seconds
      )}`;
    };
    let report = await adminSalesHelpers.getSalesReport();
    let total = await adminSalesHelpers.gettotalamount();
    console.log("getDate", getDate);
    let Details = [];
    report.forEach((orders) => {
      Details.push(orders.orders);
    });
    // report.forEach(orders => {userdata.push( orders.orders.shippingAddress)})

    res.render("admin/sales-report", {
      layout: "adminLayout",
      adminlogin: true,
      Details,
      getDate,
      total,
    });
  },

  postSalesReport: async (req, res) => {
    let Details = [];
    let total = await adminSalesHelpers.getTotalAmount(req.body);

    adminSalesHelpers.postReport(req.body).then((orderdata) => {
      orderdata.forEach((orders) => {
        Details.push(orders.orders);
      });

      res.render("admin/sales-report", {
        layout: "adminLayout",
        adminlogin: true,
        Details,
        getDate,
        total,
      });
    });
  },
};
