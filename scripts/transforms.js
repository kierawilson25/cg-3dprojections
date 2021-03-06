// set values of mat4x4 to the parallel projection / view matrix
function Mat4x4Parallel(mat4x4, prp, srp, vup, clip) {
    // 1. translate PRP to origin
    // 2. rotate VRC such that (u,v,n) align with (x,y,z)
    // 3. shear such that CW is on the z-axis
    // 4. translate near clipping plane to origin
    // 5. scale such that view volume bounds are ([-1,1], [-1,1], [-1,0])

    // ...
    // var transform = Matrix.multiply([...]);
    // mat4x4.values = transform.values;
}

// set values of mat4x4 to the perspective projection / view matrix
function Mat4x4Perspective(mat4x4, prp, srp, vup, clip) {
    // 1. translate PRP to origin
    var translateOrg = new Matrix(4,4); //create new matrix
    Mat4x4Translate(translateOrg, -prp.x, -prp.y, -prp.z); //translare prp to origin
    // 2. rotate VRC such that (u,v,n) align with (x,y,z)
    var rotateVRC = new Matrix(4,4);
    var n = prp.subtract(srp).normalize();
    var u = vup.cross(n).normalize();
    var v - n.cross(u);
    rotateVRC.values = [[u.x, u.y, u.z, 0],
                        [v.x, v.y, v.z, 0],
                        [n.x, n.y, n.z, 0],
                        [  0,   0,   0, 1]];

    // 3. shear such that CW is on the z-axis
    var shearCW = new Matrix(4,4);
    var CW = Vector3((clip[0]+clip[1])/2, (clip[2]+clip[3])/2);
    var DOP = cw.subtract(prp);
    var shx = -DOP.x/DOP.z;
    var shy = -DOP.y/DOP.z;
    Mat4x4ShearXY(shearCW, shx, shy);
    // 4. scale such that view volume bounds are ([z,-z], [z,-z], [-1,zmin])
    var scaleView = new Matrix(4,4);
    var sPerX = (2*clip[4])/(clip[1].subtract(clip[0])*clip[5]);
    var sPerY = (2*clip[4])/(clip[3].subtract(clip[2])*clip[5]);
    var sperZ = 1/ clip[5];

    Mat4x4Scale(scaleView, sPerX, sPerY, sPerZ);
    // ...
    // var transform = Matrix.multiply([...]);
    var transform = Matrix.multiply([scaleView, shearCW, rotateVRC, translateOrg]);
    // mat4x4.values = transform.values;
    mat4x4.values = transfom.values;
}

// set values of mat4x4 to project a parallel image on the z=0 plane
function Mat4x4MPar(mat4x4) {
    // mat4x4.values = ...;
}

// set values of mat4x4 to project a perspective image on the z=-1 plane
function Mat4x4MPer(mat4x4) {
    // mat4x4.values = ...;
    //check if these are the right matrix values
    mat4x4.values = [[1,0,0,0],
                     [0,1,0,0],
                     [0,0,1,0],
                     [0,0,-1,0]];

}



///////////////////////////////////////////////////////////////////////////////////
// 4x4 Transform Matrices                                                         //
///////////////////////////////////////////////////////////////////////////////////

// set values of mat4x4 to the identity matrix
function Mat4x4Identity(mat4x4) {
    mat4x4.values = [[1, 0, 0, 0],
                     [0, 1, 0, 0],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]];
}

// set values of mat4x4 to the translate matrix
function Mat4x4Translate(mat4x4, tx, ty, tz) {
    mat4x4.values = [[1, 0, 0, tx],
                     [0, 1, 0, ty],
                     [0, 0, 1, tz],
                     [0, 0, 0, 1]];
}

// set values of mat4x4 to the scale matrix
function Mat4x4Scale(mat4x4, sx, sy, sz) {
    mat4x4.values = [[sx,  0,  0, 0],
                     [ 0, sy,  0, 0],
                     [ 0,  0, sz, 0],
                     [ 0,  0,  0, 1]];
}

// set values of mat4x4 to the rotate about x-axis matrix
function Mat4x4RotateX(mat4x4, theta) {
    mat4x4.values = [[1,               0,                0, 0],
                     [0, Math.cos(theta), -Math.sin(theta), 0],
                     [0, Math.sin(theta),  Math.cos(theta), 0],
                     [0,               0,                0, 1]];
}

// set values of mat4x4 to the rotate about y-axis matrix
function Mat4x4RotateY(mat4x4, theta) {
    mat4x4.values = [[ Math.cos(theta), 0, Math.sin(theta), 0],
                     [               0, 1,               0, 0],
                     [-Math.sin(theta), 0, Math.cos(theta), 0],
                     [0, 0, 0, 1]];
}

// set values of mat4x4 to the rotate about z-axis matrix
function Mat4x4RotateZ(mat4x4, theta) {
    mat4x4.values = [[Math.cos(theta), -Math.sin(theta), 0, 0],
                     [Math.sin(theta),  Math.cos(theta), 0, 0],
                     [              0,                0, 1, 0],
                     [              0,                0, 0, 1]];
}

// set values of mat4x4 to the shear parallel to the xy-plane matrix
function Mat4x4ShearXY(mat4x4, shx, shy) {
    mat4x4.values = [[1, 0, shx, 0],
                     [0, 1, shy, 0],
                     [0, 0,   1, 0],
                     [0, 0,   0, 1]];
}

// create a new 3-component vector with values x,y,z
function Vector3(x, y, z) {
    let vec3 = new Vector(3);
    vec3.values = [x, y, z];
    return vec3;
}

// create a new 4-component vector with values x,y,z,w
function Vector4(x, y, z, w) {
    let vec4 = new Vector(4);
    vec4.values = [x, y, z, w];
    return vec4;
}
