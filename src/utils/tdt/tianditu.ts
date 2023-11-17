/** img：底图。ibo：行政边界。cia：中文注记。 */
type tiandituType = "img" | "vec" | "ibo" | "cia" | "3D";
const tdToken = "81415fc5f9ac9614ee18ccda3b07928a";
const subdomains = ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"];

export const getImageryProvider = (type: tiandituType) => {
  switch (type) {
    // 影像底图
    case "img":
      return new Cesium.WebMapTileServiceImageryProvider({
        url:
          "https://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          tdToken,
        layer: "tdtImgBase",
        credit: "tdtImgBase",
        style: "default",
        format: "image/png",
        tileMatrixSetID: "GoogleMapsCompatible",
        subdomains: subdomains,
        maximumLevel: 18
      });
    // 矢量底图
    case "vec":
      return new Cesium.WebMapTileServiceImageryProvider({
        url:
          "https://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          tdToken,
        layer: "tdtImgVec",
        credit: "tdtImgVec",
        style: "default",
        format: "image/png",
        tileMatrixSetID: "GoogleMapsCompatible",
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        maximumLevel: 18
      });
    // return new Cesium.UrlTemplateImageryProvider({
    //   url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
    //   credit: "tdtImgVec",
    //   minimumLevel: 4,
    //   maximumLevel: 18
    // });
    case "ibo":
      // 行政边界
      return new Cesium.WebMapTileServiceImageryProvider({
        url:
          "https://{s}.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          tdToken,
        layer: "tdtImgIbo",
        credit: "tdtImgIbo",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        subdomains: subdomains,
        maximumLevel: 18
      });
    case "cia":
      // 中文注记
      return new Cesium.WebMapTileServiceImageryProvider({
        url:
          "https://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=" +
          tdToken,
        layer: "tdtImgCia",
        credit: "tdtImgCia",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        subdomains: subdomains,
        maximumLevel: 18
      });
    default:
      throw new Error("请检查type");
  }
};
