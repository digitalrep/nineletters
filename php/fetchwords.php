<?php

  class NineLetterWord
  {
    private $word, $letter, $matches;
	
	public function __construct()
	{
      $randwordnum = rand(0, 24874);
      $randletternum = rand(0, 8);
      $nineletterwords = file("../txt/9letterwords.txt");
	  $this->word = $nineletterwords[$randwordnum];
      $word2 = $this->word;
      $this->letter = substr($word2, $randletternum, 1);
	  $wordlist = file("../txt/new_wordlist.txt");
	  for($i=0;$i<count($wordlist);$i++)
      {
	    $letters = str_split(trim($wordlist[$i]));
	    $wordy = str_split($this->word);
	    if($this->itmatches($wordy, $letters) == true)
	    {
	      $pos = array_search($this->letter, $letters);
	      if($pos !== false)
	      {
	        $this->matches[] = trim($wordlist[$i]);
	      }
	    }
      }
	}
	
	private function itmatches($word, $letters)
	{
	  for($i=0;$i<count($letters);$i++)
	  { 
	    $pos = array_search($letters[$i], $word);		
	    if($pos === false)
	    {
		  return false;
	    }	
	    else
	    {
		  unset($word[$pos]);
		  array_values($word);
	    }
	  }	
	  return true;	  
	}
	
	public function __toString()
	{
      $json = '{ "word" : "' . trim($this->word) . '", "letter" : "' . $this->letter . '", "wordlist" : "';
      for($i=0;$i<count($this->matches);$i++)
      {
        $json = $json . $this->matches[$i] . "&";
      }
      $json = $json . '"}';
	  return $json;
	}
  }

  $obj = new NineLetterWord;
  echo $obj;
		  
?>