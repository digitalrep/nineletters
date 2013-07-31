<?php

  class NineLetterWord
  {
    private $word, $letter, $matches, $db;
	
	public function __construct()
	{ 
      $randwordnum = rand(1, 24873);
      $randletternum = rand(0, 8);
	  
	  $this->db = new mysqli('', '', '', '');
	  $result = $this->db->query("SELECT word FROM 9letters WHERE id=$randwordnum");
	  $row = $result->fetch_assoc();
	  $this->word = $row['word'];
	  $this->letter = substr($this->word, $randletternum, 1);
	  
	  $regexp = "^[";
	  $letters = str_split($this->word);
	  for($i=0;$i<count($letters);$i++)
	  { 
	    if($i==(count($letters)-1))
		{ 
		  $regexp .= $letters[$i];
		}
		else
		{
	      $regexp .= $letters[$i] . "|";
		}
	  }
	  $regexp .= "]+$";
	  $letter_regexp = $this->letter . "+";
	  
	  $query = "CREATE TEMPORARY TABLE t AS SELECT word FROM words WHERE word REGEXP '" . $regexp . "';";
	  $query2 = "SELECT word FROM t WHERE word REGEXP '" . $letter_regexp . "';"; 
			 
	  if($result = $this->db->query($query))
	  {
	    $result = $this->db->query($query2);
	  }
	  else 
	  {
        throw new Exception("Database Error [{$this->db->errno}] {$this->db->error}");
      }
	  
	  $i=0;
	  while($row = $result->fetch_assoc())
	  {
	    $wordlist[$i] = $row['word'];
		$i++;
	  }
	  
	  for($i=0;$i<count($wordlist);$i++)
      {
	    $letters = str_split(trim($wordlist[$i]));
	    $wordy = str_split($this->word);
	    if($this->matches($wordy, $letters))
	    {
	      $pos = array_search($this->letter, $letters);
	      if($pos !== false)
	      {
	        $this->matches[] = trim($wordlist[$i]);
	      }
	    }
      }
	}
	
	private function matches($word, $letters)
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
	    if($i==(count($this->matches)-1))
		{
		  $json .= $this->matches[$i];
		}
		else
		{
          $json .= $this->matches[$i] . "&";
		}
      }
      $json = $json . '"}';
	  return $json;
	}
  }

  $obj = new NineLetterWord;
  echo $obj;
		  
?>