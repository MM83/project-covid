<?php

  $title_prefix_array =  array(
    "Spastic", "Awesome", "Wank", "Shit", "Crap", "Balls",
    "Mong", "Div", "Idiot", "Pointless", "Rubbish", "Bollocks",
    "Awful", "Redundant", "Excess"
  );
  $title_prefix_count = count($title_prefix_array);
  $title_prefix_index = rand(0, $title_prefix_count - 1);

  $title_suffix_array =  array("ly", "ify", "ful");
  $title_suffix_count = count($title_suffix_array);
  $title_suffix_index = rand(0, $title_suffix_count - 1);

  $title = $title_prefix_array[$title_prefix_index] . $title_suffix_array[$title_suffix_index] . ".js";

  $subtitle_prefix_array =  array(
    "Containerised", "Agile", "Flexible", "Dynamic",
    "Lightning-fast", "Awesome", "Ninja", "Expressive",
    "Lazy", "Incremental", "Platform-Agnostic", "Polymorphic", "Multi-Paradigm",
    "Deep Learning", "Machine-Learning", "Powerful"
  );

  $subtitle_middle_array =  array("stylesheets", "syntax", "workflow", "components", "layouts", "APIs");
  $subtitle_suffix_array =  array("at your fingertips", "out of the box", "at a click", "oven-ready");
  $subtitle_prefix_count = count($subtitle_prefix_array);
  $subtitle_middle_count = count($subtitle_middle_array);
  $subtitle_suffix_count = count($subtitle_suffix_array);
  $subtitle_prefix_index = rand(0, $subtitle_prefix_count - 1);
  $subtitle_middle_index = rand(0, $subtitle_middle_count - 1);
  $subtitle_suffix_index = rand(0, $subtitle_suffix_count - 1);

  $subtitle = $subtitle_prefix_array[$subtitle_prefix_index] . " " .
              $subtitle_middle_array[$subtitle_middle_index] . ", " .
              $subtitle_suffix_array[$subtitle_suffix_index];


  $subheadings =  array(
    "Containerised", "Agile", "Flexible",
    "Dynamic", "Lightning-fast", "Awesome",
    "Re-inventing the wheel",
    "Utterly Redundant", "Expressive",
    "Agnostic", "Polymorphic", "Multi-Paradigm",
    "Plugin-Oriented", "Agile", "Does Nothing",
    "Powerful"
  );
  $subheadings_count = count($subtitle_prefix_array);
  $subheadings = array(
    $subheadings[rand(0, $subheadings_count - 1)],
    $subheadings[rand(0, $subheadings_count - 1)],
    $subheadings[rand(0, $subheadings_count - 1)],
    $subheadings[rand(0, $subheadings_count - 1)],
    $subheadings[rand(0, $subheadings_count - 1)],
    $subheadings[rand(0, $subheadings_count - 1)]
  );



?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Shit JS Framework</title>
    <style>

    body, html {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
      font-family: Montserrat;
      background: #333;
      color: #fff;
    }
    div {
      display: flex;
      box-sizing: border-box;
    }

    h4 {
      font-weight: 100;
    }

    .popup-container {
      position: absolute;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      background-color: black;
    }

    .init-popup {
      padding: 2rem;
      background-color: white;
      flex-direction: column;
      color: black;
      border-radius: 0.5rem;
    }

    .init-popup-text {
      margin-bottom: 2rem;
    }

    button {
      font-family: Montserrat;
      background-color: #2196f3;
      border: none;
      outline: none;
      padding: 1rem;
      color: white;
      font-size: 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
    }

    .main-screen {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;

    }

    .three-columns {
        width: 100%;
        background: #eee;
        color: #222;
        padding-left: 10%;
        padding-right: 10%;
        height: 15rem;
        /* justify-content: center; */
        /* align-items: center; */
        padding-top: 2rem;
        /* padding-bottom: 1rem; */
    }
    .column {
      flex-grow: 1;
      flex-basis: 0;
      align-items: center;
      flex-direction: column;
    }

    .column > h1 {
      font-size: 1.5rem;
      font-weight: 500;
      text-align: center;
    }

    .column > section {
      text-align: center;
      padding: 2rem;
      padding-top: 1rem;
    }

    </style>
  </head>
  <body>
    <div class="main-screen">

      <h1><?php echo $title; ?></h1>


      <h4><?php echo $subtitle; ?></h4>
      <div class="three-columns">
        <div class="column">
          <h1><?php echo $subheadings[0]; ?></h1>
          <section>
            Knowing that this lightning-fast framework does fuck all leaves you free to write awesome code!
          </section>
        </div>
        <div class="column">
          <h1><?php echo $subheadings[1]; ?></h1>
          <section>
            Organise your dependencies with our breathtaking tree-shaking technology
          </section>
        </div>
        <div class="column">
          <h1><?php echo $subheadings[2]; ?></h1>
          <section>
            Modularised containers leave you free to talk shit on SO about other frameworks!
          </section>
        </div>
      </div>


      <h4>Unlock the awesome</h4>
      <div class="three-columns">
        <div class="column">
          <h1><?php echo $subheadings[3]; ?></h1>
          <section>
            Weighing in at just 10 bytes, it's literally useless
          </section>
        </div>
        <div class="column">
          <h1><?php echo $subheadings[4]; ?></h1>
          <section>
            You won't want to integrate anything else with this shit, but it is possible
          </section>
        </div>
        <div class="column">
          <h1><?php echo $subheadings[5]; ?></h1>
          <section>
            It can't break if it never worked - simples!
          </section>
        </div>
      </div>

    </div>


    <script type="text/javascript" >

    </script>
  </body>
</html>
