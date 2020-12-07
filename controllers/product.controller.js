const Product = require("../models/product.model.js");

module.exports.itemsPage = async function(req, res, next) {
	let items = 8;
	let productList = await Product.find();
	let maxPage = Math.ceil(productList.length/items);	//tinh so page toi da co the bieu dien tu database
	let page = parseInt(req.query.page) || 1; // chu y phai parseInt page query sang so tu nhien moi cong tru duoc ngon lanh
	
	if (page<1) {
		res.redirect("?page=1");	// dieu huong ve page 1 neu so page nho hon 1
	}
	if (page > maxPage) {
		res.redirect(`?page=${maxPage}`);	// dieu huong ve maxPage neu so page lon hon maxPage
	}

	let start = (page-1)*items;
	let end = page*items;

	let maxPageOption = Math.ceil(page/3)*3;
	let pageOptions = [];
	for (let i = maxPageOption; i>maxPageOption-3; i--) {		//so trang co the chon tren thanh pageOptions
		pageOptions.unshift(i);
	}

	pageOptions = pageOptions.filter(function (curr) {
		return curr <= maxPage;
	})

	let products = productList.slice(start,end);		//slice mot so luong phan tu trong db de bieu dien
	res.render("products/index.pug", {
		products: products,
		pageOptions: pageOptions,
		currentPage: page,
	})
}