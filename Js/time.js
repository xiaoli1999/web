/**
 * @file time.ts 时间工具函数
 * @description 时间工具函数
 * @author xiao li
 * @copyright 北溟有鱼<https://www.xiaoli.vip>
 * @createDate 2022-12 09:50
 */

/**
 * @function judgeQuarter 判断两个日期是否在同一季度
 * @param { String } date1 日期1 格式 YYYY-MM-DD
 * @param { String } date2 日期2 格式 YYYY-MM-DD
 * @return { { success: boolean, coed: string, result: Boolean } } { success: true, coed: '', result: true } 返回判断结果
 */
const judgeQuarter = (date1, date2) => {
    if (!date1 || !date2) {
        return {
            success: false,
            coed: '请传入两个日期',
            result: false
        };
    }

    if (typeof date1 !== "string" || typeof date2 !== "string") {
        return {
            success: false,
            coed: '日期格式应为字符串',
            result: false
        };
    }

    if (!date1.includes('-') || !date2.includes('-')) {
        return {
            success: false,
            coed: '日期格式应为 YYYY-MM-DD',
            result: false
        };
    }

    const dateArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
    const time1Arr = date1.split('-');
    const time2Arr = date2.split('-');

    if (time1Arr[0] !== time2Arr[0]) {
        return {
            success: true,
            coed: 'success',
            result: false
        };
    }

    const dateIndex = dateArr.findIndex(arr => arr.includes(time1Arr[1] - 0));

    if (dateIndex === -1) {
        return {
            success: false,
            coed: '日期月份有误',
            result: false
        };
    }

    return {
        success: true,
        coed: 'success',
        result: dateArr[dateIndex].includes(time2Arr[1] - 0)
    };
};

/**
 * @function judgeMaxDate 判断多个日期内最大的日期
 * @param { Array } dateArr ['2022-12-05', '2022-10-12' ...] YYYY-MM-DD
 * @return { { success: boolean, coed: string, result: string  } } { success: true, coed: '', result: ‘2022-12-05’ } 返回最大的日期
 */
const judgeMaxDate = (dateArr) => {
    if (!dateArr || !dateArr.length) {
        return {
            success: false,
            coed: '请传入日期数组',
            result: ''
        };
    }

    if (dateArr.some(i => typeof i !== "string")) {
        return {
            success: false,
            coed: '日期数组格式应为字符串',
            result: ''
        };
    }

    if (!dateArr.every(i => i.includes('-'))) {
        return {
            success: false,
            coed: '日期数组格式应为字符串 [YYYY-MM-DD, ...]',
            result: ''
        };
    }

    if (dateArr.length === 1) {
        return {
            success: true,
            coed: 'success',
            result: dateArr[0]
        };
    }

    const timeStampArr = dateArr.map(i => (new Date(i)).getTime());
    const timeStampMax = Math.max(...timeStampArr);
    const timeStampMaxIndex = timeStampArr.findIndex(i => i === timeStampMax);

    return {
        success: true,
        coed: 'success',
        result: dateArr[timeStampMaxIndex]
    };

};

/* 测试 judgeQuarter  */
console.log(judgeQuarter());
console.log(judgeQuarter(''));
console.log(judgeQuarter('2022-03-04'));
console.log(judgeQuarter('2022-03-12', '2022-01-18'));
console.log(judgeQuarter('2022-03-21', '2022-04-22'));

/* 测试 judgeMaxDate  */
console.log(judgeMaxDate());
console.log(judgeMaxDate([]));
console.log(judgeMaxDate(['2022-03-02']));
console.log(judgeMaxDate(['2022-03-02', '2022-01-21']));
console.log(judgeMaxDate(['2022-06-08', '2022-06-24', '2022-09-30']));
console.log(judgeMaxDate(['2022-12-24', '2022-12-18', '2023-02-11']));
