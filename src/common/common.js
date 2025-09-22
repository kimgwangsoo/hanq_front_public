import { getLookupOneMongoDB, getRentBcodeInfo } from '@/api/rent';

// 몽고DB 유저 조회 내역 가져오기
const fetchLookupOneValidTermDatesMongoDB = async (name,number) => {
    console.log(name, number, "몽고DB 유저 조회 내역");
    const response = await getLookupOneMongoDB(name, number);
    console.log(response, "몽고DB 유저 조회 내역");
    // 유효기간 데이터 추출
    if (response && response.items && response.items.length > 0) {
        let validTermData = '';
        if(response.source == "local_db"){
            validTermData = response.items[0].edtValidTermDt + response.items[0].nextEdtApdtDt;
        }else{
            validTermData = response.items[0].edt_validTermDt + response.items[0].next_edt_apdtDt;
        }
      if (validTermData) {
        // 문자열에서 날짜 형식(YYYY-MM-DD~YYYY-MM-DD) 추출
        const datePattern = /\d{4}-\d{2}-\d{2}~\d{4}-\d{2}-\d{2}/g;
        const matches = validTermData.match(datePattern);
        
        if (matches && matches.length > 0) {
          // 각 날짜 범위를 ~로 분리하여 배열에 순서대로 저장
          const validTermDates = [];
          matches.forEach(match => {
            const [startDate, endDate] = match.trim().split('~');
            validTermDates.unshift({
              rentStart: startDate,
              rentEnd: endDate,
            });
          });
          console.log("추출된 적용구간 데이터:", validTermDates);

          return validTermDates;
        } else {
          console.log("유효기간 데이터를 찾을 수 없습니다.");
          return null;
        }
      }
    }
  };

  // 몽고DB 유저 조회 내역 가져오기
  const fetchLookupOneMongoDB = async (name,number) => {
    console.log(name, number, "몽고DB 유저 조회 내역");
    const response = await getLookupOneMongoDB(name, number);
    console.log(response, "몽고DB 유저 조회 내역");
    return response;
  };

  // 대여품목 내구연한 가져오기
  const fetchRentItemBcodeInfo = async (pcode,bcode) => {
    const response = await getRentBcodeInfo(pcode,bcode);
    return response;
  };

  export default {
    fetchLookupOneValidTermDatesMongoDB,
    fetchLookupOneMongoDB,
    fetchRentItemBcodeInfo
  }