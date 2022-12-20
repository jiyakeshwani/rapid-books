import React, { useMemo, useState } from "react";
import { NumericFormat, numericFormatter } from "react-number-format";

function App() {
  const [records, setRecords] = useState([]);
 
  const { creditTotal, debitTotal } = useMemo(() => {
    return {
      creditTotal: records.reduce(
        (acc, record) => acc + Number(record.creditValue),
        0
      ),
      debitTotal: records.reduce(
        (acc, record) => acc + Number(record.debitValue),
        0
      ),
    };
  }, [records]);
  const addRow = (e) => {
    e.preventDefault();
    const inputState = {
      accountValue: { value: "" },
      creditValue: "",
      debitValue: "",
    };

    setRecords((prev) => [...prev, inputState]);
  };

  const onChange = (index, e) => {
    e.preventDefault();
    setRecords((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }
        return {
          ...item,
          [e.target.name]: e.target.value,
        };
      });
    });
  };

  const deleteRow = (e, index) => {
    e.preventDefault();
    console.log("Delete row", index, records.slice().splice(index, 1));
    setRecords((prev) => {
      const newArray = prev.slice();
      newArray.splice(index, 1);
      return newArray;
    });
  };

 

  console.log(records);

  return (
    <>
      <div className="container">
        <div className="grid-3">
          <div className="head first">Accounts</div>
          <div className="head">Debit Amount</div>
          <div className="head">Credit Amount</div>
          <div></div>
        </div>
        <div className="grid-3">
          {records.map((item, i) => {
            return (
              <>
                <select
                  value={item.accountValue.value}
                  name="accountValue"
                  onChange={(e) => onChange(i, e)}
                  className="form-input one"
                >
                  <option>Select Account</option>
                  <option value="State Bank Of India">
                    State Bank of India
                  </option>
                  <option value="Kotak Bank">Kotak Bank</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="Central Bank of India">
                    Central Bank of India
                  </option>
                </select>

                <NumericFormat
                  value={numericFormatter(item.debitValue || "0", {
                    thousandSeparator: true,
                    thousandsGroupStyle: "lakh",
                  })}
                  name="debitValue"
                  className="form-input align-right"
                  thousandSeparator={true}
                  thousandsGroupStyle="lakh"
                  onValueChange={(values) => {
                    const { value } = values;
                   
                    const indexToUpdate = i;
                    setRecords((records) =>
                      records.map((record, index) =>
                        index === indexToUpdate
                          ? { ...record, debitValue: value }
                          : record
                      )
                    );
                  }}
                />
                <NumericFormat
                  value={numericFormatter(item.creditValue || "0", {
                    thousandSeparator: true,
                    thousandsGroupStyle: "lakh",
                  })}
                  className="form-input align-right"
                  name="creditValue"
                  thousandsGroupStyle="lakh"
                  thousandSeparator={true}
                  onValueChange={(values) => {
                    const { value } = values;
                    const indexToUpdate = i;
                    setRecords((records) =>
                      records.map((record, index) =>
                        index === indexToUpdate
                          ? { ...record, creditValue: value }
                          : record
                      )
                    );
                  }}
                />
                <button className="delete-btn" onClick={(e) => deleteRow(e, i)}>
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </>
            );
          })}
        </div>
        <div className="grid-3">
          <div className="flex space-between">
            <button className="add-btn" onClick={addRow}>
              +Add Row
            </button>
            <span className="margin">Total</span>
          </div>
          <span className="margin align-right">
            {numericFormatter(String(debitTotal) || "0", {
              thousandSeparator: true,
              thousandsGroupStyle: "lakh",
            })}
          </span>
          <span className="margin align-right">
            {numericFormatter(String(creditTotal) || "0", {
              thousandSeparator: true,
              thousandsGroupStyle: "lakh",
            })}
          </span>
        </div>
        <button type="submit" value="submit" hidden></button>
      </div>
    </>
  );
}

export default App;
