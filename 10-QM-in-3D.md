---
title: "Chapter 10: Quantum mechanics in three dimensions" 
short_title: "Ch. 10: QM in 3D"
numbering:
  enumerator: 10.%s
authors:
  - name: 
    affiliations:
---

In this chapter we are now ready to move onto the study of quantum mechancis in three dimensions! Much of what we have learnt up until this stage will carry across in a rather straightforward manner, which is good news. Obviously the world around us is three dimensional, and so it is necessary to move broaden our application of quantum mechanics to three dimensions, so that we can go on to study real-world situations, for example, laying the foundations for the study of the **Hydrogen atom** — arugably the most famous quantum system of all, and one of its biggest early successes. While we won't get all the way there in this unit, we will nevertheless introduce the basics of quantum mechancis in 3D, so that you will be able to go straight there next year. 

## The position of a particle in 3D

We will largely follow the same path in 3D that we followed in 1D, and start off with the most basic of all properties of a particle: its **position**. One of the biggest changes in 3D compared to 1D is that many physical quantities now become **vectors**, and the position is the first of these. In order to specify a point in space, we now need to use the **position vector** $\mathbf{r}$, 
```{math}
\rvec = x \ivec + y \jvec + z \kvec.
```
Just as before we associated a quantum state to each position $x$, we will now introduce a **3D position states** as $\ket{\rvec}$, and an associated **3D spatial wavefunction** $\psi(\rvec)$, such that a general quantum state of a particle in three dimensions can be written as
````{card}
```{math}
\ket{\psi} = \infint \infint \infint \psi(\rvec) \ket{\rvec} d^3\rvec,
```
````
which should be compared to [](#e-general-quantum-state). 
```{aside} *Notation for vectors and 3D integrals*
*We will also write $\rvec = (x,y,z)$ as an alternative and convenient shorthand for the position vector. In this way, we can write $\psi(\rvec)$ and $\psi(x,y,z)$ interchangably, as both should make sense. We will exclusively use **boldface** in the lecture notes for vectors, instead of $\vec{r}$.*

*We will also use the notation $d^3\rvec$ for the **volume element** $dx dy dz$. Previously you have seen this as $d\tau$. Both are common (Griffiths for example uses the former, and we will follow their notation here).*

*Finally, we will sometimes write $\int_V f(\rvec) d^3\rvec$ in place of $\infint \infint \infint f(\rvec) d^3\rvec$, to indicate an integration over **all space** when this will not cause any confusion.*
```
This state corresponds to a **superposition** of the particle being at position $\rvec$. The 3D position states $\ket{\rvec}$ are **unphysical states**, which satisfy the orthogonality and normalisation condition
````{card}
```{math}
\inner{\rvec'}{\rvec} = \delta^{(3)}(\rvec-\rvec'),
```
````
where $\delta^{(3)}(\rvec-\rvec')$ is the **3D Dirac delta function**, given by
```{math}
\delta^{(3)}(\rvec-\rvec') = \delta(x-x')\delta(y-y')\delta(z-z'),
```
i.e. it is the **product** of three delta functions, one for each coordinate. Using the 3D delta function, as an exercise you will show that the normalisation condition $\| \ket{\psi} \|^2 = 1$, in terms of the wavefunction $\psi(\rvec)$ becomes
````{card}
```{math}
\int_V|\psi(\rvec)|^2 d^3\rvec = 1,
```
````
which should be compared to [](#e-norm-wavefunction).  The **interpretation** of this equation is in fact identical to the interpretation we gave to [](#e-norm-wavefunction). However, to arrive at this, we first need to introduce **operators** corresponding to the **coordinates** of the particle. 

### Coordinate operators

One new question that arises in 3D with the introduction of **vector quantities** is *how to associate operators to them?* It turns out that the correct way to do this is to **associate a separate operator to each component of the vector**. In the context of the **position**, this means we will associate an operator to **each coordinate** of the particle. We thus introduce 3 operators, $\hat{X}$, $\hat{Y}$ and $\hat{Z}$. The position states $\ket{\rvec}$ are **joint eigenstates of all 3 operators**, satisfying the eigenvalue equations
````{card}
```{math}
:label: e-coordinate-eigenstates
\hat{X}\ket{\rvec} &= x \ket{\rvec},& \hat{Y}\ket{\rvec} &= y \ket{\rvec},& \hat{Z}\ket{\rvec} &= z \ket{\rvec}
```
````
As you will confirm as an [exercise](#ex-degen-coordinate-ops), we now have a **vast amount of degeneracy** in these operators. Recall that **degeneracy** refers to the fact that there can be **multiple eigenvectors with the same eigenvalue**. We see that any two position states $\ket{\rvec}$ and $\ket{\rvec'}$ that have the same $x$ coordinate, but arbitrary $y$ and $z$ coordinates, will be degenerate as far as $\hat{X}$ is concerned (and similarly for $\hat{Y}$ and $\hat{Z}$). There are **infinitely many such states**. 

From [](#e-coordinate-eigenstates), it is also straightforward to see that the three coordinates are **compatible observables** that can therefore be **simultaneously measured** (in principle at least). Recall that the **mathematical** property behind compatibility is **commutativity**. We can easily check that the commutator of any two coordinate operators vanishes, for example,
```{math}
[\hat{X},\hat{Y}]\ket{\rvec} &= (\hat{X}\hat{Y} - \hat{Y}\hat{X})\ket{\rvec},\\
&= \hat{X}(y\ket{\rvec}) - \hat{Y}(x\ket{\rvec}),\\
&= (xy - yx)\ket{\rvec},\\
&= 0.
``` 

