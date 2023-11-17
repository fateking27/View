// 校验经度
import { message } from "@/utils/message";

export const isLongitude = value => {
  //经度,整数部分为0-180小数部分为0到15位
  const reg = /^-?((0|[1-9]\d?|1[1-7]\d)(\.\d{1,7})?|180(\.0{1,7})?)?$/;
  if (!reg.test(value)) {
    message("经度整数部分为0-180,小数部分为0到15位!", {
      type: "warning"
    });
  }
  return reg.test(value);
};

// 校验纬度
export const isLatitude = value => {
  //纬度,整数部分为0-90小数部分为0到15位
  const reg = /^-?((0|[1-8]\d|)(\.\d{1,7})?|90(\.0{1,7})?)?$/;
  if (!reg.test(value)) {
    message("纬度整数部分为0-90,小数部分为0到15位!", {
      type: "warning"
    });
  }
  return reg.test(value);
};
