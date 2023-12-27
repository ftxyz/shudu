import { useEffect, useRef, useState } from "react";
import './SudokuGrid.css'

function SudokuGrid(){
    const [board, setBoard] = useState(Array(9).fill(Array(9).fill(0)));
    const [tempBoard, setTempBoard] = useState(Array(9).fill(Array(9).fill(0)));

    const inputRefs = useRef(Array.from({ length: 9 }, () => Array(9).fill(null)));

    //生成指定范围内的随机整数
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //对数组进行洗牌，即随机打乱数组中元素的顺序
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = getRandomInt(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    //判断在指定位置放置特定数字是否符合数独规则，即同一行、同一列和同一3x3小格内不能有重复的数字
    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
          if (board[row][i] === num && i !== col) {
            return false; // 同一行存在重复数字
          }
          if (board[i][col] === num && i !== row) {
            return false; // 同一列存在重复数字
          }
          const subgridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
          const subgridCol = 3 * Math.floor(col / 3) + i % 3;
          if (board[subgridRow][subgridCol] === num && (subgridRow !== row || subgridCol !== col)) {
            return false; // 同一个3x3小格内存在重复数字
          }
        }
        return true;
      }

    //通过递归的方式尝试填入数字，并验证是否符合数独规则，直到找到合适的解，或者无解为止。
    function solveSudoku(board) {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
              const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
              for (let num of nums) {
                if (isValid(board, i, j, num)) {
                  board[i][j] = num;
                  if (solveSudoku(board)) {
                    return true;
                  } else {
                    board[i][j] = 0;
                  }
                }
              }
              return false;
            }
          }
        }
        return true;
    }

    useEffect(() => {
        generateSudokuBoard();
        // eslint-disable-next-line
    }, []);
    
    //生成数独棋盘的入口函数。它首先创建一个9x9的二维数组，并调用solveSudoku函数来填充数独棋盘。
    function generateSudokuBoard() {
        const solvedBoard = Array(9).fill().map(() => Array(9).fill(0));
        solveSudoku(solvedBoard); // 生成完整的数独棋盘
        const newBoard = JSON.parse(JSON.stringify(solvedBoard)); // 创建一个新的数独棋盘
      
        const numToRemove = Math.floor(Math.random() * 9) + 40; // 随机生成要移除的数字的数量
      
        for (let i = 0; i < numToRemove; i++) {
          let row = Math.floor(Math.random() * 9);
          let col = Math.floor(Math.random() * 9);
          if (newBoard[row][col] !== 0) { // 如果该位置的数字不为0，则将其设置为0
            newBoard[row][col] = 0;
          } else {
            // 如果该位置的数字已经为0，则重新选择位置
            while (newBoard[row][col] === 0) {
              row = Math.floor(Math.random() * 9);
              col = Math.floor(Math.random() * 9);
            }
            newBoard[row][col] = 0;
          }
        }
        setBoard(newBoard);
        setTempBoard(newBoard);
    }

    function handleInputChange(rowIndex, colIndex, e) {
        const { value } = e.target;
        const newTempBoard = tempBoard.map((row) => [...row]);
      
        if (value === '') {
          newTempBoard[rowIndex][colIndex] = 0; // 用户删除了输入，将对应位置清空
        } else if (/^[1-9]+$/.test(value)) {
          const num = parseInt(value.slice(-1));
          newTempBoard[rowIndex][colIndex] = num; // 符合数独规则，更新临时数独棋盘
        }
      
        const isInvalid = isValid(newTempBoard, rowIndex, colIndex, newTempBoard[rowIndex][colIndex]);
        // 根据检查结果动态设置className
        inputRefs.current[rowIndex][colIndex].className = isInvalid ? 'input' : 'input invalid';
      
        setTempBoard(newTempBoard);

        const isBoardFull = isBoardCompletelyFilled(newTempBoard);
        const isSudokuValid = isSudokuBoardValid(newTempBoard);
        if (isBoardFull && isSudokuValid) {
            setTimeout(() => {
              alert('挑战成功！🎉🎊');
            }, 0);
        }
      }

      function isBoardCompletelyFilled(board) {
        for (let row of board) {
          for (let cell of row) {
            if (cell === 0) {
              return false; // 发现未填满的位置，返回 false
            }
          }
        }
        return true; // 所有位置都已填满
      }

      function isSudokuBoardValid(board) {
        for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
            const num = board[row][col];
            if (num !== 0 && !isValid(board, row, col, num)) {
              return false; // 存在不满足数独规则的数字
            }
          }
        }
        return true; // 所有数字都满足数独规则
      }

    return (
        <div className="sudoku-board-container">
            <button onClick={generateSudokuBoard}>出题</button>
            <table className="sudoku-board">
            <tbody>
                {tempBoard.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((value, colIndex) => (
                    <td key={colIndex}>
                        <input
                            type="text"
                            value={value || ''}
                            readOnly={board[rowIndex][colIndex] !== 0} // 基于状态而不是基于输入的值
                            onChange={(e) => handleInputChange(rowIndex, colIndex, e)}
                            onClick={(e) => {e.target.select();}} // 输入框获得焦点时选中文本
                            ref={(ref) => (inputRefs.current[rowIndex][colIndex] = ref)}
                        />
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}
export default SudokuGrid;