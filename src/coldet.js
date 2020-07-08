export function collisionDet(oba, obb, obas, obbs){
    //
    let obatop = oba.position.y;
    let obaleft = oba.position.x;
    if(obas){
        let obabottom = oba.position.y + oba.size;
        let obaright = oba.position.x + oba.size;
    }else{
        let obabottom = oba.position.y + oba.height;
        let obaright = oba.position.x + oba.width;
    }
    //
    let obbtop = obb.position.y;
    let obbleft = obb.position.x;
    if(obbs){
        let obbbottom = obb.position.y + obb.size;
        let obbright = obb.position.x + obb.size;
    }else{
        let obbbottom = obb.position.y + obb.height;
        let obbright = obb.position.x + obb.width;
    }
    //
    if(obbleft < obaright &&
        obbright > obaleft &&
        obbtop < obabottom &&
        obbbottom > obatop)
    {
        return true;
    }else{
        return false;
    }
    //
}