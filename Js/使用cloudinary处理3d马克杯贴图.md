
### 默认链接
```
https://res.cloudinary.com/inkink/image/upload/l_mug:workUrl.jpg/c_crop,w_1150,h_900,x_-400,y_0,e_distort:0:-450:1150:-480:1110:700:50:750/c_pad,w_875,h_1200/l_radialize/e_displace,fl_layer_apply,y_-35/fl_layer_apply,y_35,x_20/mug/mug_left.jpg
```

### 马克杯图
```
https://res.cloudinary.com/inkink/image/upload/mug_left.jpg
```

### 处理后的马克杯图
```
https://res.cloudinary.com/inkink/image/upload/mug/mug_left.jpg
```

### 目标图片
```
https://res.cloudinary.com/inkink/image/upload/l_mug:workUrl.jpg/mug_left.jpg
```

### 目标图片叠在马克杯上（默认）
```
https://res.cloudinary.com/inkink/image/upload/l_mug:workUrl.jpg/mug/mug_left.jpg
```

### 开始处理，默认处理内容
```
/c_crop,w_1150,h_900,x_-400,y_0,e_distort:0:-450:1150:-480:1110:700:50:750
/c_pad,w_875,h_1200
/l_radialize
/e_displace,fl_layer_apply,y_-35/fl_layer_apply,y_35,x_20
```



### //第一步，处理马克杯，调整马克杯角度  （暂不调整）
```
https://res.cloudinary.com/inkink/image/upload/l_mug:workUrl.jpg/mug_left.jpg
```

### //第二步，调整目标图片尺寸（宽875，高1200）
```
/c_pad,w_875,h_1200
```

### //第三步，通过e_displace（置换图像）、fl_layer_apply（叠加图片）叠到马克杯区域
```
/l_radialize/e_displace,fl_layer_apply,y_-40
```

### //第四步，调整目标图片大小并展示截取区域
```
/c_crop,w_1150,h_900,x_-400,y_0,e_distort:0:-450:1150:-480:1110:700:50:750
```

### //暂调
```
https://res.cloudinary.com/inkink/image/upload/l_mug:workUrl.jpg/c_crop,w_1150,h_900,x_-400,y_0,e_distort:-48:-506:1050:-536:1010:682:10:710/c_pad,w_912,h_1248,y_72/l_radialize/e_displace,fl_layer_apply,y_-52/mug/mug_left.jpg
```

### 方形图暂调
```
https://res.cloudinary.com/inkink/image/upload/l_gltlhqjqjz1cdf2knxxp.png/c_crop,w_1900,h_1900/c_pad,w_950,h_950,e_distort:12:78:928:48:899:892:54:920/l_radialize/e_displace,fl_layer_apply,y_-44/fl_layer_apply,y_20/mug/mug_left.jpg
```

### 方形图暂调向下移动12
```
https://res.cloudinary.com/inkink/image/upload/l_gltlhqjqjz1cdf2knxxp.png/c_crop,w_1900,h_1900/c_pad,w_950,h_950,e_distort:12:78:928:48:899:892:54:920/l_radialize/e_displace,fl_layer_apply,y_-44/fl_layer_apply,y_12/mug/mug_left.jpg
```
