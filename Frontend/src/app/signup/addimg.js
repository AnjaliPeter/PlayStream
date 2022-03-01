function addimg()
{
    if(req.files){

        var file = req.files.image;
        var filename = req.files.image.name;
    
        // upload image to images-folder
        file.mv("../../assets/images/"+filename,function(err){
            if(err){
                // res.send(err);
            }
        });
    
    }
}
