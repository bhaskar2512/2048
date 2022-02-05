This is a project built by Bhaskar Ashok Tripathi.
Basically this is a 2048 game which is implemented using stack concept in the backend logic and I have used basic CSS and HTML for the UI part.

Instruction on how to play:
2048 is played on a gray 4×4 grid, with numbered tiles that slide when a player moves them using the four keys(1,2,3,4 as four directions left,right,up,down). Every turn, a new tile will randomly appear in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move. If a move causes three consecutive tiles of the same value to slide together, only the two tiles farthest along the direction of motion will combine. If all four spaces in a row or column are filled with tiles of the same value, a move parallel to that row/column will combine the first two and last two.

Implementation details:
Intuition:
1. Any of the four operations can be taken down to a single operation.
   For my implementation I converted each operation into the "left" operation.
   How it can be done?
   -> By rotating the array in a particular way will convert the operation to the left operation.
      For example ->
      Given a board and the operation "down".
      We can rotate the board 3 times in the anticlockwise direction and then do our "left" operation.
      After the "left" operation we can just turn the resulting board into anticlockwise direction to get the desired transformation.
2. The problem now just remained to a left operation.
    -> For this I have used stack.
       Each element in the stack have a pair of values.
       The first one represents the cell value and the second values denotes whether it can be combined with the value on its left.
       0-> can be combined
       1-> cannot be combined
       For each row I am pushing the values into the stack form left to right.
       If the previous (or the topmost element in the stack) is equal to the current element and it can be combbined with the current element then the previous values is popped from the stack and combined values is pushed back into the stack with the second value as 1(As it cannot be combined with other element).


There are two ways for Running this Game on your machine:
1. Easy : visit https://bhaskar-2048.herokuapp.com/
2. You will require NodeJs preinstalled.
3. open terminal
    Move to the project directory
    Type:
    i. npm install 
    -> This will install all the required pakages.
    ii. node index.js
    Open Browser and visit : http://localhost:3000/