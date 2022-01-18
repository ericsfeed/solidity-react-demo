// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Messages {
  string[] myMessages;

  function addMessage(string memory messageValue) public {
      myMessages.push(messageValue);
  }

  function updateMessage(uint messageIndex, string memory newMessageValue) public returns (bool) {
      if(myMessages.length > messageIndex){
          myMessages[messageIndex] = newMessageValue;
          return true;
      }
      return false;
  }

  function deleteMessage(uint messageIndex) public returns (bool) {
      if(myMessages.length > messageIndex){
          for(uint i=messageIndex; i < myMessages.length-1; i++){
              myMessages[i] = myMessages[i+1];
          }
          myMessages.pop();
          return true;
      }
      return false;
  }

  function getMessages() public view returns (string[] memory) {
      return myMessages;
  }
}
