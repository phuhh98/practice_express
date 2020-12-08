const Product = require("../../models/product.model.js");

// module.exports.productPagination = async function(req, res, next) {
	
// 	// console.log(req);s
// 	if (res.locals.products === null) {
// 		next();
// 		return;
// 	}
// 		let page = parseInt(req.query.page) || 1; // chu y phai parseInt page query sang so tu nhien moi cong tru duoc ngon lanh
// 		let itemsPerPage = 9;
// 	try {		
// 		if (res.locals.search) {		//neu da qua search
// 			let searchUrl = req.originalUrl;	// url toi
// 			let pageQuery = "&page="+page;
// 			let url = searchUrl.replace(pageQuery, "") + "&" || searchUrl;	// url sau khi cat di "&page=..."

// 			res.locals.url = url;
// 		} else {
// 			res.locals.search = false;	// neu khong qua search thi bo qua cat url
// 		}	
// 	} catch(err) {
// 		console.error(err);
// 	}
	

// 	let productList = res.locals.products || await Product.find();
// 	let maxPage = Math.ceil(productList.length/itemsPerPage);	//tinh so page toi da co the bieu dien tu database
	
// 	if (page<1) {
// 		res.redirect("?page=1");	// dieu huong ve page 1 neu so page nho hon 1
// 	}
// 	if (page > maxPage) {
// 		res.redirect(`?page=${maxPage}`);	// dieu huong ve maxPage neu so page lon hon maxPage
// 	}

// 	let start = (page-1)*itemsPerPage;
// 	let end = page*itemsPerPage;

// 	let maxPageOption = Math.ceil(page/3)*3;
// 	let pageOptions = [];
// 	for (let i = maxPageOption; i>maxPageOption-3; i--) {		//so trang co the chon tren thanh pageOptions
// 		pageOptions.unshift(i);
// 	}

// 	pageOptions = pageOptions.filter(function (curr) {
// 		return curr <= maxPage;
// 	});

// 	let products = productList.slice(start,end);		//slice mot so luong phan tu trong db de bieu dien

// 	res.locals.products = products;
// 	res.locals.pageOptions = pageOptions;
// 	res.locals.currentPage = parseInt(page);
// 	next();
// }

// module.exports.pageRender = function(req, res, next) {
// 	res.render("products/index.pug")
// }

module.exports.products = async function(req, res, next) {
	try {
		let name = req.query.name || "";
		

		var productList = await Product.find();

		let matchedProducts = productList.filter((product) => {
			return product.name.toLowerCase().includes(name.toLowerCase());
		});


		// res.locals.products = matchedProducts;
		// res.locals.search = true;
		res.set("info", "use search query \"name\" to search product by name, ex: baseUrl?name=a");
		res.json(matchedProducts);
		next();
	} catch(err) {
		console.error(err);
	}
}