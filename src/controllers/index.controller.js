const indexCtrll = {};

indexCtrll.renderIndex=(req,res)=>{
	res.render('index');
};
indexCtrll.renderAbout=(req,res)=>{
	res.render('about');
};

module.exports = indexCtrll;