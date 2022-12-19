import React, { useState } from "react";
import { NumericFormat, numericFormatter } from "react-number-format";

function App() {
  const [form, setForm] = useState([]);
  let [creditTotal, setCreditTotal] = useState(0.0);
  let [debitTotal, setDebitTotal] = useState(0.0);

  const addRow = (e) => {
    e.preventDefault();
    const inputState = {
      accountValue: { value: "" },
      creditValue: "",
      debitValue: "",
    };

    setForm((prev) => [...prev, inputState]);
  };

  const onChange = (index, e) => {
    e.preventDefault();
    setForm((prev) => {
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
    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };

  var formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return (
    <>
      <div className="container">
        <div className="flex space-btw">
          <div className="head first">Accounts</div>
          <div className="head">Debit Amount</div>
          <div className="head">Credit Amount</div>
        </div>
        <form>
          {form.map((item, i) => {
            console.log(item);

            console.log(item.debitValue);
            return (
              <>
                <div className="flex row" key={i}>
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
                    value={item.debitValue}
                    className="form-input"
                    thousandSeparator={true}
                    // onValueChange={(values) => {
                    //     const { formattedValue, value } = values;
                    //     // formattedValue = $2,223
                    //     // value ie, 2223
                    //     setForm({ debitValue: formattedValue });
                    //   }}
                  />
                  <NumericFormat
                    value={item.creditValue}
                    className="form-input"
                    thousandSeparator={true}
                  />
                  <button
                    className="delete-btn"
                    onClick={(e) => deleteRow(e, i)}
                  >
                    <span class="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </>
            );
          })}
          <div className="flex space-btw">
            <button className="add-btn" onClick={addRow}>
              +Add Row
            </button>
            <span className="margin">Total</span>
            <span className="margin">{creditTotal}</span>
            <span className="margin">{debitTotal}</span>
          </div>
          <button type="submit" value="submit" hidden></button>
        </form>
      </div>
    </>
  );
}

// function App() {
//   let [data, setForm] = useState([
//     {
//       accountValue: "",

//       creditValue: "78987",

//       debitValue: "",
//     },
//   ]);

//   //   let [account, setAccount] = useState([]);
//   //   let [accountValue, setAccountValue] = useState("");
//   //   let [debitAmount, setDebitAmount] = useState([]);
//   //   let [debitValue, setDebitValue] = useState("");
//   //   let [creditValue, setCreditValue] = useState("");
//   //   let [creditAmount, setCreditAmount] = useState([]);
//   let [rows, setRows] = useState(["", "", ""]);
//   let [creditTotal, setCreditTotal] = useState("");
//   let [debitTotal, setDebitTotal] = useState("");

//   function handleChange(index, e, selected) {
//     let newData = [...data];
//     newData[index][selected] = e.target.value;
//     setForm(newData);
//   }

//   //   function handleAccountValue(e) {
//   //     setAccountValue(e.target.value);
//   //   }
//   function handleSubmit(e) {
//     e.preventDefault();
//     setForm([
//       {
//         accountValue: "",

//         creditValue: "",

//         debitValue: "",
//       },
//     ]);
//     // handleInputs();
//   }

//   //   function handleCreditV(e) {
//   //     setCreditValue(e.target.value);
//   //   }

//   //   function handleInputs() {
//   //     setCreditAmount((creditAmount) => creditAmount.concat(creditValue));
//   //     setAccount((account) => account.concat(accountValue));
//   //     setDebitAmount((debitAmount) => debitAmount.concat(debitValue));
//   //   }

//   //   function handleDebitValue(e) {
//   //     setDebitValue(e.target.value);
//   //   }

//   function addRow() {
//     console.log("added");
//     setForm([
//       ...data,
//       {
//         accountValue: "",

//         creditValue: "",

//         debitValue: "",
//       },
//     ]);
//   }

//   function deleteRow(e) {
//     setRows((prevRows) => prevRows.slice(0, prevRows.length - 1));
//   }
//   function calculateDebitTotal() {}

//   return (
//     <div className="container">
//       <div className="flex space-btw">
//         <div className="head first">Accounts</div>
//         <div className="head">Debit Amount</div>
//         <div className="head">Credit Amount</div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         {data.map((row, i) => {
//           <>
//             <div className="flex">
//   <select
//     onChange={(e) => handleChange(i, e, "accountValue")}
//     value={row?.accountValue}
//     className="form-input one"
//   >
//     <option>Select Account</option>
//     <option value="sbi">State Bank of India</option>
//     <option value="kbk">Kotak Bank</option>
//     <option value="hdfc">HDFC Bank</option>
//     <option value="yes">Yes Bank</option>
//     <option value="cbi">Central Bank of India</option>
//   </select>

//               <input
//                 value={row?.debitValue}
//                 onChange={(e) => handleChange(i, e, "debitValue")}
//                 name="debit"
//                 type="text"
//                 className="form-input "
//               />

//               <input
//                 value={row?.creditValue}
//                 onChange={(e) => handleChange(i, e, "creditValue")}
//                 name="credit"
//                 type="text"
//                 className="form-input "
//               />
//               <button hidden type="submit" value="submit"></button>
//   <span
//     onClick={deleteRow}
//     class="material-symbols-outlined delete-btn"
//   >
//     delete
//   </span>
//             </div>
//           </>;
//         })}
//         <button type="submit" value="submit" hidden></button>
//         <div className="flex">
//           <button onClick={addRow} className="add-btn">
//             +Add Row
//           </button>
//           <span>Total</span>
//           <span value="">Total</span>
//           <span>Total</span>
//         </div>
//       </form>
//     </div>
//   );
// }

export default App;
