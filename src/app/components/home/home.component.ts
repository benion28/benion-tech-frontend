import { NewsService } from './../../services/news.service';
import { fadeAnimation } from './../../fade-animations';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class HomeComponent implements OnInit {

  topStories = [
    {
      $key: 'id1',
      title: 'FIRST NEWS OF THE DAY',
      imgSrc: '../../../assets/images/technology.jpg',
      details: `
      Manatees have been found as far as 75 kilometres (47 mi) offshore, where there are shallow coastal flats and calm mangrove creeks filled with seagrass. Inland lakes where manatees dwell
      include Lake Volta, the Inner Niger River Delta in Mali, Lake Léré, and Lake de Tréné. Due to fluctuating flow rates and water levels in rivers, some of these permanent lakes serve as refuges for
      manatees in connecting rivers during the dry season. From north to south, the river systems that contain manatees include: the Senegal, Saloum, Gambia, Casamance, Cacheu, Mansôa, Geba,
      Buba, Tombali, Cacine, Kogon, Kondoure, Sierra Leone, Great Scarcies, Little Scarcies, Sherbro, Malem, Waanje, Sewa, Missunado, Cavalla, St. Paul, Morro, St. John, Bandama, Niouniourou,
      Sassandra, Comoé, Bia, Tano, Volta, Mono, Oueme, Niger, Mekrou, Benue, Cross, Katsena Ala, Bani, Akwayafe, Rio del Rey, Ngosso, Andokat, Mene, Munaya, Wouri, Sanaga, Faro, Chari,
      Bamaingui, Bahr-Kieta, Logoné, Mitémélé, Gabon, Ogoué, Lovanzi, Kouilou, Congo, Dande, Bengo, and Cuanza. Manatees move up these rivers until they are unable to proceed because of
      shallow waters or strong waterfalls.[1]
      The areas with the highest manatee populations are Guinea-Bissau, the lagoons of Côte d'Ivoire, the southern portions of the Niger River in Nigeria, the Sanaga River in Cameroon, the coastal
      lagoons in Gabon, and the lower parts of the Congo River. As part of a study completed in Côte d'Ivoire to assess where the majority of African manatees favor living, a sample of African
      manatees was radio-tagged and tracked. The tracking observed most of the sample in coastal lagoons, mangroves, and other herbaceous growths. They were also found in the grassy estuaries
      of big rivers with mangroves and in protected coastal spots with less than 3 metres (10 ft) of water containing both mangroves and marine macrophytes.[1]
      `,
      isView: true
    },
    {
      $key: 'id2',
      title: 'SECOND NEWS OF THE DAY',
      imgSrc: '../../../assets/images/ict.jpg',
      details: `
      World Manatees have been found as far as 75 kilometres (47 mi) offshore, where there are shallow coastal flats and calm mangrove creeks filled with seagrass. Inland lakes where manatees dwell
      include Lake Volta, the Inner Niger River Delta in Mali, Lake Léré, and Lake de Tréné. Due to fluctuating flow rates and water levels in rivers, some of these permanent lakes serve as refuges for
      manatees in connecting rivers during the dry season. From north to south, the river systems that contain manatees include: the Senegal, Saloum, Gambia, Casamance, Cacheu, Mansôa, Geba,
      Buba, Tombali, Cacine, Kogon, Kondoure, Sierra Leone, Great Scarcies, Little Scarcies, Sherbro, Malem, Waanje, Sewa, Missunado, Cavalla, St. Paul, Morro, St. John, Bandama, Niouniourou,
      Sassandra, Comoé, Bia, Tano, Volta, Mono, Oueme, Niger, Mekrou, Benue, Cross, Katsena Ala, Bani, Akwayafe, Rio del Rey, Ngosso, Andokat, Mene, Munaya, Wouri, Sanaga, Faro, Chari,
      Bamaingui, Bahr-Kieta, Logoné, Mitémélé, Gabon, Ogoué, Lovanzi, Kouilou, Congo, Dande, Bengo, and Cuanza. Manatees move up these rivers until they are unable to proceed because of
      shallow waters or strong waterfalls.[1]
      The areas with the highest manatee populations are Guinea-Bissau, the lagoons of Côte d'Ivoire, the southern portions of the Niger River in Nigeria, the Sanaga River in Cameroon, the coastal
      lagoons in Gabon, and the lower parts of the Congo River. As part of a study completed in Côte d'Ivoire to assess where the majority of African manatees favor living, a sample of African
      manatees was radio-tagged and tracked. The tracking observed most of the sample in coastal lagoons, mangroves, and other herbaceous growths. They were also found in the grassy estuaries
      of big rivers with mangroves and in protected coastal spots with less than 3 metres (10 ft) of water containing both mangroves and marine macrophytes.[1]
      `,
      isView: false
    }
  ];


  marquee = `Hello, You Are Welcomed To Benion World Of Creativiy,
  A Home For All Your Entertainment, Sport Updates,
  Technological Discoveries And An Excellent Medium For Education And Research !!....`;

  newsOpen = {
    title: 'Zero News',
    imgSrc: null,
    details: 'No Opened News Yet'
  };

  constructor(public newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopStories();
    this.newsService.getEntertainment();
    this.newsService.getSports();
    this.newsService.getTechnology();
  }

  viewNews(news) {
    this.newsOpen = {
      title: news.title,
      imgSrc: news.imgSrc.trim(),
      details: news.details
    };
  }

  closeNews() {
    this.newsOpen = {
      title: 'Zero News',
      imgSrc: null,
      details: 'No Opened News Yet'
    };
  }

}
