import React,{ useState } from 'react';

export default function AssignCheckbox() {
  const assigns = [
    { value: "김서인", label: "김서인", no: 1},
    { value: "김휘민", label: "김휘민", no: 2},
    { value: "최시창", label: "최시창", no: 3},
    { value: "김현석", label: "김현석", no: 4}
  ];

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, no) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, no]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== no));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(no)를 담은 배열로 checkItems 상태 업데이트
      const noArray = [];
      assigns.forEach((el) => noArray.push(el.no));
      setCheckItems(noArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  }

  return (
    <>
    <div>
      <input type='checkbox' name='select-all'
        onChange={(e) => handleAllCheck(e.target.checked)}
        // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
        checked={checkItems.length === assigns.length ? true : false} />
    
    목록</div>
    
    {assigns?.map((assigns, key) => (
      <div key={key}>
        <div>
          <input type='checkbox' name={`select-${assigns.no}`}
            onChange={(e) => handleSingleCheck(e.target.checked, assigns.no)}
            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
            checked={checkItems.includes(assigns.no) ? true : false} />
        
        {assigns.label}</div>
      </div>
    ))}

    </>
  )
}

;
