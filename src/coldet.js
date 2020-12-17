export function collisionDet(oba, obb, obas, obbs){
    //
    let obatop = oba.position.y;
    let obaleft = oba.position.x;
    let obabottom = 0;
    let obaright = 0;
    if(obas){
        obabottom = oba.position.y + oba.size;
        obaright = oba.position.x + oba.size;
    }else{
        obabottom = oba.position.y + oba.height;
        obaright = oba.position.x + oba.width;
    }
    //
    let obbtop = obb.position.y;
    let obbleft = obb.position.x;
    let obbbottom = 0;
    let obbright = 0;
    if(obbs){
        obbbottom = obb.position.y + obb.size;
        obbright = obb.position.x + obb.size;
    }else{
        obbbottom = obb.position.y + obb.height;
        obbright = obb.position.x + obb.width;
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